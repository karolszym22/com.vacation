package com.vacation.com.vacation.Controller;

import com.vacation.com.vacation.Model.Task;
import com.vacation.com.vacation.Model.Task.Tasks;
import com.vacation.com.vacation.Model.TaskData;
import com.vacation.com.vacation.Service.TaskService;
import org.hibernate.usertype.UserType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }
    @PostMapping("/tasksToDo")
    public ResponseEntity<TaskData> processTask(@RequestBody TaskData taskData) {
        TaskData result = taskService.processTask(taskData.getTaskStatus(), taskData.getUserType());
        System.out.println(result);
        return ResponseEntity.ok(result);
    }


}
