package com.vacation.com.vacation.Controller;

import com.vacation.com.vacation.Model.TaskData;
import com.vacation.com.vacation.Service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping("/tasksToDo")
    public ResponseEntity<TaskData> processTask(@RequestBody TaskData taskData) {
        TaskData result = taskService.processTask(taskData.getTaskStatus(), taskData.getUserType());
        return ResponseEntity.ok(result);
    }


}
