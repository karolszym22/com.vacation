package com.vacation.com.vacation;


import jakarta.persistence.*;

@Entity
@Table(name = "vacations")
public class HolidayLeave implements Vacation{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;


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

    @Override
    public String Type() {
        return "Urlop wypoczynkowy";
    }
}
