package com.vacation.com.vacation.VacationService;

import com.vacation.com.vacation.Repository.HolidayLeaveRepository;
import com.vacation.com.vacation.Model.HolidayLeave;
import com.vacation.com.vacation.Service.VacationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

public class VacationServiceTest {

    @InjectMocks
    private VacationService vacationService;

    @Mock
    private HolidayLeaveRepository holidayLeaveRepository;
    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }
    @Test
    public void testGetVacationByTaskStatus() {
        String taskStatusToFind = "SomeTaskStatus";
        List<HolidayLeave> vacationList = new ArrayList<>();
        HolidayLeave vacation1 = new HolidayLeave();
        vacation1.setTaskStatus("SomeTaskStatus");
        vacationList.add(vacation1);
        when(holidayLeaveRepository.findByTaskStatus(taskStatusToFind)).thenReturn(vacationList);

        List<HolidayLeave> result = vacationService.getVacationByTaskStatus(taskStatusToFind);

        assertEquals(1, result.size());
        assertEquals(taskStatusToFind, result.get(0).getTaskStatus());
    }

    @Test
    public void testGetVacationByTaskStatusNoMatches() {
        String taskStatusToFind = "NonExistentTaskStatus";
        when(holidayLeaveRepository.findByTaskStatus(taskStatusToFind)).thenReturn(new ArrayList<>());

        List<HolidayLeave> result = vacationService.getVacationByTaskStatus(taskStatusToFind);

        assertEquals(0, result.size());
    }
    @Test
    public void testGetVacationByTaskStatusOneMatchInList() {

        String taskStatusToFind = "Zaakceptowane";
        List<HolidayLeave> vacationList = new ArrayList<>();
        HolidayLeave vacation1 = new HolidayLeave();
        vacation1.setTaskStatus("Zaakceptowane");
        vacationList.add(vacation1);
        HolidayLeave vacation2 = new HolidayLeave();
        vacation2.setTaskStatus("Odrzucone");
        vacationList.add(vacation2);
        HolidayLeave vacation3 = new HolidayLeave();
        vacation3.setTaskStatus("Zaakceptowane");
        vacationList.add(vacation3);
        HolidayLeave vacation4 = new HolidayLeave();
        vacation4.setTaskStatus("Zwrocone");
        vacationList.add(vacation4);
        when(holidayLeaveRepository.findByTaskStatus(taskStatusToFind)).thenReturn(vacationList);

        List<HolidayLeave> result = vacationService.getVacationByTaskStatus(taskStatusToFind);


        assertEquals(2, result.size());
        assertEquals(taskStatusToFind, result.get(0).getTaskStatus());
    }
}
