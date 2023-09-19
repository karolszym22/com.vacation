package com.vacation.com.vacation.Controller;

import com.vacation.com.vacation.Model.DateValidationRequest;
import com.vacation.com.vacation.Service.DateValidationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
@RequestMapping("/dateValidate")
public class DateValidationController {

    private final DateValidationService dateValidationService;

    @Autowired
    public DateValidationController(DateValidationService dateValidationService) {
        this.dateValidationService = dateValidationService;
    }

    @PostMapping
    public ResponseEntity<String> validateDate(@RequestBody DateValidationRequest dateValidationRequest) {
        boolean isDateValid = dateValidationService.isDateValid(dateValidationRequest);
        if (!isDateValid) {
            return ResponseEntity.badRequest().body("Date range overlaps with an existing vacation");
        }
        return ResponseEntity.ok("Date is valid");
    }

    private boolean isDateRangeOverlap(Date start1, Date end1, Date start2, Date end2) {
        return start1.before(end2) && end1.after(start2);
    }
}
