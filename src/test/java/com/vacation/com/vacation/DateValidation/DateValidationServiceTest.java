package com.vacation.com.vacation.DateValidation;

import com.vacation.com.vacation.Repository.HolidayLeaveRepository;
import com.vacation.com.vacation.Model.DateValidationRequest;
import com.vacation.com.vacation.Model.HolidayLeave;
import com.vacation.com.vacation.Service.DateValidationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class DateValidationServiceTest {

    @Mock
    private HolidayLeaveRepository holidayLeaveRepository;

    private DateValidationService dateValidationService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        dateValidationService = new DateValidationService(holidayLeaveRepository);
    }

    @Test
    public void testValidDateRange() {

        DateValidationRequest request = new DateValidationRequest();
        request.setPersonId(1);
        request.setStartDate(new Date(2023, 9, 1));
        request.setEndDate(new Date(2023, 9, 5));

        List<HolidayLeave> overlappingLeaves = new ArrayList<>();
        HolidayLeave leave = new HolidayLeave();
        leave.setPersonId(1);
        leave.setStartDate(new Date(2023, 8, 3));
        leave.setEndDate(new Date(2023, 8, 7));
        overlappingLeaves.add(leave);

        Mockito.when(holidayLeaveRepository.findByPersonId(1)).thenReturn(overlappingLeaves);

        boolean isDateValid = dateValidationService.isDateValid(request);
        assertTrue(isDateValid);
    }

    @Test
    public void testInvalidDateRange() {

        DateValidationRequest request = new DateValidationRequest();
        request.setPersonId(1);
        request.setStartDate(new Date(2023, 8, 1));
        request.setEndDate(new Date(2023, 8, 5));

        List<HolidayLeave> overlappingLeaves = new ArrayList<>();
        HolidayLeave leave = new HolidayLeave();
        leave.setPersonId(1);
        leave.setStartDate(new Date(2023, 8, 3));
        leave.setEndDate(new Date(2023, 8, 7));
        overlappingLeaves.add(leave);

        Mockito.when(holidayLeaveRepository.findByPersonId(1)).thenReturn(overlappingLeaves);

        boolean isDateValid = dateValidationService.isDateValid(request);
        assertFalse(isDateValid);
    }
}