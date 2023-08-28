package com.vacation.com.vacation.Controller;

import com.vacation.com.vacation.Model.Task;
import com.vacation.com.vacation.Model.Task.Tasks;
import com.vacation.com.vacation.Service.TaskService;
import org.hibernate.usertype.UserType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/tasksToDo")
    public ResponseEntity<String> processTask(@RequestParam String taskStatus, @RequestParam String userType) {
        String result = taskService.processTask(taskStatus, userType);
        return ResponseEntity.ok(result);
    }
}
