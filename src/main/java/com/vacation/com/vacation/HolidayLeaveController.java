package com.vacation.com.vacation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class HolidayLeaveController {

    private final HolidayLeaveRepository repository;

    @Autowired
    public HolidayLeaveController(HolidayLeaveRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/sampledata")
    public List<HolidayLeave> getSampleData() {
        // Tworzenie przykładowych obiektów HolidayLeave
        HolidayLeave vacation1 = new HolidayLeave();
        vacation1.setDescription("Vacation 1");
        vacation1.setDaysNum(5);
        vacation1.setDone(false);

        HolidayLeave vacation2 = new HolidayLeave();
        vacation2.setDescription("Vacation 2");
        vacation2.setDaysNum(10);
        vacation2.setDone(true);

        HolidayLeave vacation3 = new HolidayLeave();
        vacation3.setDescription("Vacation 3");
        vacation3.setDaysNum(7);
        vacation3.setDone(false);

        // Zapisanie obiektów do repozytorium
        repository.save(vacation1);
        repository.save(vacation2);
        repository.save(vacation3);

        // Pobranie wszystkich obiektów z repozytorium
        List<HolidayLeave> vacationList = repository.findAll();

        return vacationList;
    }
}
