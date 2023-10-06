package com.vacation.com.vacation.Model;

import java.util.Date;

public class CorrespondenceAndMessageDTO {
    private Correspondence correspondence;
    private Message message;



    public Correspondence getCorrespondence() {
        return correspondence;
    }

    public Message getMessage() {
        return message;
    }

    public void setMessage(Message message) {
        this.message = message;
    }

    public void setCorrespondence(Correspondence correspondence) {
        this.correspondence = correspondence;
    }
}
