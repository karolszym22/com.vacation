package com.vacation.com.vacation;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "vacations")
public class HolidayLeave implements Vacation{
    @Id
    @GeneratedValue
    private int id;
    private String description;
    private int daysNum;

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

    @Override
    public String Type() {
        return "Urlop wypoczynkowy";
    }
}
