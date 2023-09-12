package com.vacation.com.vacation.Model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "vacations")
public class HolidayLeave implements Vacation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Temporal(TemporalType.DATE)
    private Date startDate;

    @Temporal(TemporalType.DATE)
    private Date endDate;
    private String description;
    private int daysNum;
    private boolean done;
    private String employerName;
    private String taskStatus;

    private int personId;

    public boolean isDone() {
        return done;
    }

    @Override
    public String Type() {
        return "Urlop wypoczynkowy";
    }
}
