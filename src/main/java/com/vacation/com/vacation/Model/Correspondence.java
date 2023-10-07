package com.vacation.com.vacation.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.Date;

@Entity
public class Correspondence {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String title;
    private int personOneId;
    private Date date;

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
    public int getPersonOneId() {
        return personOneId;
    }

    public void setPersonOneId(int personOneId) {
        this.personOneId = personOneId;
    }

    public int getPersonTwoId() {
        return personTwoId;
    }

    public void setPersonTwoId(int personTwoId) {
        this.personTwoId = personTwoId;
    }

    private int personTwoId;

    private String authorName;

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}