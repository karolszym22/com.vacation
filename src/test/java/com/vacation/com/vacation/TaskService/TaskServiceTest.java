package com.vacation.com.vacation.TaskService;

import com.vacation.com.vacation.Model.TaskData;
import com.vacation.com.vacation.Model.Task.Tasks;
import com.vacation.com.vacation.Service.TaskService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class TaskServiceTest {

    @InjectMocks
    private TaskService taskService;

    @Test
    public void testProcessTaskForHRAndAccepted() {
        // Given
        String taskStatus = "Pracodawca:Zaakceptowane";
        String userType = "HR";

        TaskData expectedTaskData = new TaskData();
        expectedTaskData.setTaskEnums(Arrays.asList(Tasks.ODRZUC, Tasks.ZWROC, Tasks.ZAAKCEPTUJ));

        when(taskService.processTask(taskStatus, userType)).thenReturn(expectedTaskData);

        // When
        TaskData actualTaskData = taskService.processTask(taskStatus, userType);

        // Then
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
