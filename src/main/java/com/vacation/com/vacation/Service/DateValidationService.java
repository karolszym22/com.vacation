package com.vacation.com.vacation.Service;
import com.vacation.com.vacation.Repository.HolidayLeaveRepository;
import com.vacation.com.vacation.Model.DateValidationRequest;
import com.vacation.com.vacation.Model.HolidayLeave;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class DateValidationService {

    private final HolidayLeaveRepository holidayLeaveRepository;

    @Autowired
    public DateValidationService(HolidayLeaveRepository holidayLeaveRepository) {
        this.holidayLeaveRepository = holidayLeaveRepository;
    }

    public boolean isDateValid(DateValidationRequest dateValidationRequest) {
        Iterable<HolidayLeave> holidays = holidayLeaveRepository.findByPersonId(dateValidationRequest.getPersonId());
        for (HolidayLeave holiday : holidays) {
            if (isDateRangeOverlap(dateValidationRequest.getStartDate(), dateValidationRequest.getEndDate(), holiday.getStartDate(), holiday.getEndDate())) {
                return false;
            }
        }
        return true;
    }

    private boolean isDateRangeOverlap(Date start1, Date end1, Date start2, Date end2) {
        return start1.before(end2) && end1.after(start2);
    }
}