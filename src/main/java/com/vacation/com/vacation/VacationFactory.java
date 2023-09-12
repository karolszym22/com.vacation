package com.vacation.com.vacation;

import com.vacation.com.vacation.Model.HolidayLeave;
import com.vacation.com.vacation.Model.MaternityLeave;
import com.vacation.com.vacation.Model.PaternityLeave;
import com.vacation.com.vacation.Model.Vacation;

public class VacationFactory {
    public Vacation createVacation(String rodzaj) {
        if (rodzaj.equalsIgnoreCase("wypoczynkowy")) {
            return new HolidayLeave();
        } else if (rodzaj.equalsIgnoreCase("macierzynski")) {
            return new MaternityLeave();
        } else if (rodzaj.equalsIgnoreCase("tacierzynski")) {
            return new PaternityLeave();
        } else {
            throw new IllegalArgumentException("Nieznany rodzaj urlopu: " + rodzaj);
        }
    }
}
