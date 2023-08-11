package com.vacation.com.vacation;

import jakarta.persistence.Entity;

public class MaternityLeave implements Vacation{
    @Override
    public String Type() {
        return "Urlop macierzyński";
    }
}
