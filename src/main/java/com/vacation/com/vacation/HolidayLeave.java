package com.vacation.com.vacation;


import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "vacations")
public class HolidayLeave implements Vacation{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Temporal(TemporalType.DATE)
    private Date startDate;

    @Temporal(TemporalType.DATE)
    private Date endDate;
    private String description;
    private int daysNum;
    private boolean done; // Nowe pole 'done'

    // pozostałe metody

    public boolean isDone() {
        return done;
    }

    public void setDone(boolean done) {
        this.done = done;
    }

    HolidayLeave(){

    }
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getDaysNum() {
        return daysNum;
    }

    public void setDaysNum(int daysNum) {
        this.daysNum = daysNum;
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
    @Override
    public String Type() {
        return "Urlop wypoczynkowy";
    }
}
