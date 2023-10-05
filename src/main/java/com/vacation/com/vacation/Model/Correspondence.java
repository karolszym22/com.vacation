package com.vacation.com.vacation.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Correspondence {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String title;
    private int personOneId;

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