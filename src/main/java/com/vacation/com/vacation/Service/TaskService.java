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

        if ("PRACODAWCA".equals(userType) || "TESTER".equals(userType)) {
            if ("W realizacji".equals(taskStatus) || "HR:Zwróc".equals(taskStatus)) {;
                System.out.println("2");
                taskEnums.add(Task.Tasks.ODRZUC);
                taskEnums.add(Task.Tasks.ZWROC);
                taskEnums.add(Task.Tasks.ZAAKCEPTUJ);
            }
        }
        if ("HR".equals(userType) || "TESTER".equals(userType)) {
            if ("Zaakceptowane".equals(taskStatus)) {
                System.out.println("1");
                taskEnums.add(Task.Tasks.ODRZUC);
                taskEnums.add(Task.Tasks.ZWROC);
                taskEnums.add(Task.Tasks.DO_REALIZACJI);
            }
        }
        if ("PRACOWNIK".equals(userType) || "TESTER".equals(userType)) {
            if ("Zwrócone".equals(taskStatus)) {

                taskEnums.add(Task.Tasks.DODAJ);
            }
        }else{
            System.out.println("3");
        }
        taskData.setTaskEnums(taskEnums);
        return taskData;
    }
}






