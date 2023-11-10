package com.vacation.com.vacation.Model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private int correspondenceId;
    @Temporal(TemporalType.DATE)
    private Date date;
    private String title;
    private String initialsColor;

    public String getInitialsColor() {
        return initialsColor;
    }

    public void setInitialsColor(String initialsColor) {
        this.initialsColor = initialsColor;
    }

    public int getCorrespondenceId() {
        return correspondenceId;
    }

    public void setCorrespondenceId(int correspondenceId) {
        this.correspondenceId = correspondenceId;
    }

    private String description;
    private int authorId;
    private String authorName;

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    private int recipientId;
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public int getAuthorId() {
        return authorId;
    }

    public void setAuthorId(int authorId) {
        this.authorId = authorId;
    }

    public int getRecipientId() {
        return recipientId;
    }

    public void setRecipientId(int recipientId) {
        this.recipientId = recipientId;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
