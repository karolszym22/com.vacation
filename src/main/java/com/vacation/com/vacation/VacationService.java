package com.vacation.com.vacation;

import com.vacation.com.vacation.Model.HolidayLeave;
import com.vacation.com.vacation.HolidayLeaveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VacationService {

    private final HolidayLeaveRepository holidayLeaveRepository;

    @Autowired
    public VacationService(HolidayLeaveRepository holidayLeaveRepository) {
        this.holidayLeaveRepository = holidayLeaveRepository;
    }

    public List<HolidayLeave> getAllVacations() {
        return holidayLeaveRepository.findAll();
    }

    public Page<HolidayLeave> getAllVacationsPaged(Pageable pageable) {
        return holidayLeaveRepository.findAll(pageable);
    }

    public Optional<HolidayLeave> getVacationById(Integer id) {
        return holidayLeaveRepository.findById(id);
    }

    public void createVacation(HolidayLeave vacation) {
        holidayLeaveRepository.save(vacation);
    }

    public void updateVacation(Integer id, HolidayLeave updatedVacation) {
        Optional<HolidayLeave> optionalVacation = holidayLeaveRepository.findById(id);
        if (optionalVacation.isPresent()) {
            HolidayLeave vacation = optionalVacation.get();
            vacation.setTaskStatus(updatedVacation.getTaskStatus());
            holidayLeaveRepository.save(vacation);
        }
    }

    public void deleteVacation(Integer id) {
        if (holidayLeaveRepository.existsById(id)) {
            holidayLeaveRepository.deleteById(id);
        }
    }
}
