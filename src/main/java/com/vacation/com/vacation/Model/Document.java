package com.vacation.com.vacation.Model;

import jakarta.persistence.*;

import java.util.Date;
@Entity
@Table(name = "documents")
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private Date currentData;
    private String description;
    private String employerName;
    private int daysNum;
    private String taskStatus;
    private int vacationId;


    public long getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getCurrentData() {
        return currentData;
    }

    public void setCurrentData(Date currentData) {
        this.currentData = currentData;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getEmployerName() {
        return employerName;
    }

    public void setEmployerName(String employerName) {
        this.employerName = employerName;
    }

    public int getDaysNum() {
        return daysNum;
    }

    public void setDaysNum(int daysNum) {
        this.daysNum = daysNum;
    }

    public String getTaskStatus() {
        return taskStatus;
    }

    public void setTaskStatus(String taskStatus) {
        this.taskStatus = taskStatus;
    }

    public long getVacationId() {
        return vacationId;
    }

    public void setVacationId(int vacationId) {
        this.vacationId = vacationId;
    }
}