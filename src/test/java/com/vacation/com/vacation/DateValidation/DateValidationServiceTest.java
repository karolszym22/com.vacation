package com.vacation.com.vacation.DateValidation;

import com.vacation.com.vacation.Repository.HolidayLeaveRepository;
import com.vacation.com.vacation.Model.DateValidationRequest;
import com.vacation.com.vacation.Model.HolidayLeave;
import com.vacation.com.vacation.Service.DateValidationService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class DateValidationServiceTest {

    @Mock
    private HolidayLeaveRepository holidayLeaveRepository;

    @InjectMocks
    private DateValidationService dateValidationService;

    @Test
    public void testValidDateRange() {
        // Given
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

        when(holidayLeaveRepository.findByPersonId(1)).thenReturn(overlappingLeaves);

        // When
        boolean isDateValid = dateValidationService.isDateValid(request);

        // Then
        assertTrue(isDateValid);
    }

    @Test
    public void testInvalidDateRangeOne() {
        // Given
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

        when(holidayLeaveRepository.findByPersonId(1)).thenReturn(overlappingLeaves);

        // When
        boolean isDateValid = dateValidationService.isDateValid(request);

        // Then
        assertFalse(isDateValid);
    }
    @Test
    public void testInvalidDateRangeTwo() {
        // Given
        DateValidationRequest request = new DateValidationRequest();
        request.setPersonId(1);
        request.setStartDate(new Date(2023, 8, 1));
        request.setEndDate(new Date(2023, 9, 4));

        List<HolidayLeave> overlappingLeaves = new ArrayList<>();
        HolidayLeave leave = new HolidayLeave();
        leave.setPersonId(1);
        leave.setStartDate(new Date(2023, 8, 27));
        leave.setEndDate(new Date(2023, 9, 2));
        overlappingLeaves.add(leave);

        when(holidayLeaveRepository.findByPersonId(1)).thenReturn(overlappingLeaves);

        // When
        boolean isDateValid = dateValidationService.isDateValid(request);

        // Then
        assertFalse(isDateValid);
    }
}
