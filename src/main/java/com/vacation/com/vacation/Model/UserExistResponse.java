package com.vacation.com.vacation.Model;

public class UserExistResponse {
    private boolean exist;

    public UserExistResponse(boolean exist) {
        this.exist = exist;
    }

    public boolean isExist() {
        return exist;
    }

    public void setExist(boolean exist) {
        this.exist = exist;
    }
}