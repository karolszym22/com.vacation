package com.vacation.com.vacation.TaskService;
import com.vacation.com.vacation.Service.TaskService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;


@ExtendWith(MockitoExtension.class)
public class TaskServiceTest {

    @InjectMocks
    private TaskService taskService;

    @Test
    public void testProcessTaskPracownikZakceptuj() {
        String result = taskService.processTask("Zakceptuj", "PRACOWNIK");
        assertEquals("Sent 'Zakceptuj' task.", result);
    }

    @Test
    public void testProcessTaskHRZakceptuj() {
        String result = taskService.processTask("Zakceptuj", "HR");
        assertEquals("Sent 'Zakceptuj' task.", result);
    }

    @Test
    public void testProcessTaskHROdrzuc() {
        String result = taskService.processTask("Odrzuc", "HL");
        assertEquals("Sent 'Odrzuc' task.", result);
    }

    @Test
    public void testProcessTaskPracodawcaZwroc() {
        String result = taskService.processTask("Zwroc", "PRACODAWCA");
        assertEquals("Sent 'ODRZUC', 'Zwroc', 'Zakceptuj' tasks.", result);
    }


    @Test
    public void testProcessTaskNoMatchingTasks() {
        String result = taskService.processTask("InnyStatus", "InnyUserType");
        assertEquals("No matching tasks sent.", result);
    }
}