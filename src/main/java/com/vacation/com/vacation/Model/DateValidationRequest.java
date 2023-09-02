package com.vacation.com.vacation.Model;


import java.util.Date;

public class DateValidationRequest {
    private int personId;
    private Date startDate;
    private Date endDate;


    public int getPersonId() {
        return personId;
    }

    public void setPersonId(int personId) {
        this.personId = personId;
        System.out.println(this.personId);
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }
}