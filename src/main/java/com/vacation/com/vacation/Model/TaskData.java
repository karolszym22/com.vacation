package com.vacation.com.vacation.Model;

import java.util.List;

public class TaskData {
    private String taskStatus;
    private String userType;
    private List<Task.Tasks> taskEnums;
    public String getTaskStatus() {
        return taskStatus;
    }
    public void setTaskEnums(List<Task.Tasks> taskEnums) {
        this.taskEnums = taskEnums;
    }
    public List<Task.Tasks> getTaskEnums() {
        return taskEnums;
    }
    public void setTaskStatus(String taskStatus) {
        this.taskStatus = taskStatus;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }
}
