package com.vacation.com.vacation.Model;

import jakarta.persistence.*;

import java.util.Date;

public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Temporal(TemporalType.DATE)
    private Date date;
    private String title;
    private String description;
    private int authorId;
    private int personId;

}
