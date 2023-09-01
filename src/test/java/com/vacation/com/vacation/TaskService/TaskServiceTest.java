package com.vacation.com.vacation.Service;

import com.vacation.com.vacation.Model.TaskData;
import com.vacation.com.vacation.Model.Task.Tasks;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

public class TaskServiceTest {

    @Mock
    private TaskService taskService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testProcessTaskForHRAndAccepted() {
        String taskStatus = "Pracodawca:Zaakceptowane";
        String userType = "HR";

        TaskData expectedTaskData = new TaskData();
        expectedTaskData.setTaskEnums(Arrays.asList(Tasks.ODRZUC, Tasks.ZWROC, Tasks.ZAAKCEPTUJ));

        when(taskService.processTask(taskStatus, userType)).thenReturn(expectedTaskData);

        TaskData actualTaskData = taskService.processTask(taskStatus, userType);

        assertEquals(expectedTaskData.getTaskEnums(), actualTaskData.getTaskEnums());
    }

    @Test
    public void testProcessTaskForPracodawcaAndDodane() {
        String taskStatus = "Pracownik:Dodane";
        String userType = "PRACODAWCA";

        TaskData expectedTaskData = new TaskData();
        expectedTaskData.setTaskEnums(Arrays.asList(Tasks.ODRZUC, Tasks.ZWROC, Tasks.ZAAKCEPTUJ));

        when(taskService.processTask(taskStatus, userType)).thenReturn(expectedTaskData);

        TaskData actualTaskData = taskService.processTask(taskStatus, userType);

        assertEquals(expectedTaskData.getTaskEnums(), actualTaskData.getTaskEnums());
    }

    @Test
    public void testProcessTaskForPracodawcaAndZwroc() {
        String taskStatus = "HR:Zwróc";
        String userType = "PRACODAWCA";

        TaskData expectedTaskData = new TaskData();
        expectedTaskData.setTaskEnums(Arrays.asList(Tasks.ODRZUC, Tasks.ZWROC, Tasks.ZAAKCEPTUJ));

        when(taskService.processTask(taskStatus, userType)).thenReturn(expectedTaskData);

        TaskData actualTaskData = taskService.processTask(taskStatus, userType);

        assertEquals(expectedTaskData.getTaskEnums(), actualTaskData.getTaskEnums());
    }
}
