package com.vacation.com.vacation.Service;

import com.vacation.com.vacation.Model.Task;
import com.vacation.com.vacation.Model.Task.Tasks;
import org.hibernate.usertype.UserType;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class TaskService {


    public String processTask(String taskStatus, String userType) {
        if ("PRACOWNIK".equals(userType)) {
            if ("Zakceptuj".equals(taskStatus)) {
                sendTaskToAddress("http://localhost:8080/tasksToDo2", "Zakceptuj");
                return "Sent 'Zakceptuj' task.";
            }
        } else if ("HR".equals(userType)) {
            if ("Odrzuc".equals(taskStatus) || "Zwroc".equals(taskStatus) || "Zakceptuj".equals(taskStatus)) {
                sendTaskToAddress("http://localhost:8080/tasksToDo2", taskStatus);
                return "Sent '" + taskStatus + "' task.";
            }
        } else if ("PRACODAWCA".equals(userType)) {
            if ("Odrzuc".equals(taskStatus) || "Zwroc".equals(taskStatus) || "Zakceptuj".equals(taskStatus)) {
                sendTaskToAddress("http://localhost:8080/tasksToDo2", "ODRZUC", "Zwroc", "Zakceptuj");
                return "Sent 'ODRZUC', 'Zwroc', 'Zakceptuj' tasks.";
            }
        }

        return "No matching tasks sent.";
    }

    private void sendTaskToAddress(String address, String... taskTypes) {
        for (String taskType : taskTypes) {
        }
    }
}
