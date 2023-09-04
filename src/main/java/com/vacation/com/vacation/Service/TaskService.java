package com.vacation.com.vacation.Service;

import com.vacation.com.vacation.Model.Task;
import com.vacation.com.vacation.Model.Task.Tasks;
import com.vacation.com.vacation.Model.TaskData;
import org.hibernate.usertype.UserType;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class TaskService {

    public TaskData processTask(String taskStatus, String userType) {
        TaskData taskData = new TaskData();
        List<Task.Tasks> taskEnums = new ArrayList<>();

        if ("HR".equals(userType)) {
            if ("Zaakceptowane".equals(taskStatus)) {
                taskEnums.add(Task.Tasks.ODRZUC);
                taskEnums.add(Task.Tasks.ZWROC);
                taskEnums.add(Task.Tasks.ZAAKCEPTUJ);
            }
        } else if ("PRACODAWCA".equals(userType)) {
            if ("Pracownik:Dodane".equals(taskStatus) || "HR:Zwróc".equals(taskStatus)) {;
                taskEnums.add(Task.Tasks.ODRZUC);
                taskEnums.add(Task.Tasks.ZWROC);
                taskEnums.add(Task.Tasks.ZAAKCEPTUJ);
            }
        }
        if ("PRACOWNIK".equals(userType)) {
            if ("Zwrócone".equals(taskStatus)) {

                taskEnums.add(Task.Tasks.DODAJ);
            }
        }
        taskData.setTaskEnums(taskEnums);
        return taskData;
    }
}






