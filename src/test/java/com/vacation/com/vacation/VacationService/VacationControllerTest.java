package com.vacation.com.vacation.VacationService;
import com.vacation.com.vacation.Controller.VacationController;
import com.vacation.com.vacation.Model.HolidayLeave;
import com.vacation.com.vacation.Service.VacationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class VacationControllerTest {

    @InjectMocks
    private VacationController vacationController;

    @Mock
    private VacationService vacationService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetVacationsByTaskStatus() {
        // Przygotowanie danych testowych
        String taskStatus = "completed";
        List<HolidayLeave> vacations = new ArrayList<>();

        // Tutaj dodaj przykładowe obiekty HolidayLeave do listy vacations
        HolidayLeave vacation1 = new HolidayLeave();
        vacation1.setTaskStatus("completed");
        vacation1.setDescription("Wakacje 1");

        HolidayLeave vacation2 = new HolidayLeave();
        vacation2.setTaskStatus("pending");
        vacation2.setDescription("Wakacje 2");

        HolidayLeave vacation3 = new HolidayLeave();
        vacation3.setTaskStatus("completed");
        vacation3.setDescription("Wakacje 3");

        vacations.add(vacation1);
        vacations.add(vacation2);
        vacations.add(vacation3);

        // Konfiguracja zachowania mocka
        when(vacationService.getVacationByTaskStatus(taskStatus)).thenReturn(vacations);

        // Wywołanie metody kontrolera
        ResponseEntity<List<HolidayLeave>> responseEntity = vacationController.getVacationsByTaskStatus(taskStatus);

        // Weryfikacja odpowiedzi
        assertEquals(200, responseEntity.getStatusCodeValue()); // Oczekiwany status kodu 200

        // Przefiltrowanie listy vacations po taskStatus "completed"
        List<HolidayLeave> expectedVacations = vacations.stream()
                .filter(vacation -> vacation.getTaskStatus().equals("completed"))
                .collect(Collectors.toList());

        assertEquals(expectedVacations, responseEntity.getBody()); // Oczekiwana lista vacations w ciele odpowiedzi

        // Weryfikacja, czy metoda serwisu została wywołana raz z odpowiednimi argumentami
        verify(vacationService, times(1)).getVacationByTaskStatus(taskStatus);
    }
}