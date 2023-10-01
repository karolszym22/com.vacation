package com.vacation.com.vacation.VacationService;

import com.vacation.com.vacation.Repository.HolidayLeaveRepository;
import com.vacation.com.vacation.Model.HolidayLeave;
import com.vacation.com.vacation.Service.VacationService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class VacationServiceTest {

    @InjectMocks
    private VacationService vacationService;

    @Mock
    private HolidayLeaveRepository holidayLeaveRepository;

    @Test
    public void testGetVacationByTaskStatus() {
        // Given
        String taskStatusToFind = "SomeTaskStatus";
        List<HolidayLeave> vacationList = new ArrayList<>();
        HolidayLeave vacation1 = new HolidayLeave();
        vacation1.setTaskStatus("SomeTaskStatus");
        vacationList.add(vacation1);
        when(holidayLeaveRepository.findByTaskStatus(taskStatusToFind)).thenReturn(vacationList);

        // When
        List<HolidayLeave> result = vacationService.getVacationByTaskStatus(taskStatusToFind);

        // Then
        assertEquals(1, result.size());
        assertEquals(taskStatusToFind, result.get(0).getTaskStatus());
    }

    @Test
    public void testGetVacationByTaskStatusNoMatches() {
        // Given
        String taskStatusToFind = "NonExistentTaskStatus";
        when(holidayLeaveRepository.findByTaskStatus(taskStatusToFind)).thenReturn(new ArrayList<>());

        // When
        List<HolidayLeave> result = vacationService.getVacationByTaskStatus(taskStatusToFind);

        // Then
        assertEquals(0, result.size());
    }
}