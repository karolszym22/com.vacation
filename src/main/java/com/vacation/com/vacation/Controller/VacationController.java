package com.vacation.com.vacation.Controller;

import com.vacation.com.vacation.Model.HolidayLeave;
import com.vacation.com.vacation.Service.VacationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
public class VacationController {
    private final VacationService vacationService;

    @Autowired
    VacationController(final VacationService vacationService){
        this.vacationService = vacationService;
    }

    @PostMapping("/vacations")
    ResponseEntity<HolidayLeave> createVacation(@RequestBody HolidayLeave toCreate){
        vacationService.createVacation(toCreate);
        return ResponseEntity.created(URI.create("/" + toCreate.getId())).body(toCreate);
    }
    @GetMapping("/vacations/personVacations/{personId}")
    public ResponseEntity<List<HolidayLeave>> readCurrentPersonVacations(@PathVariable Integer personId) {
        System.out.println("Co leci"+ personId);
        List<HolidayLeave> vacations = vacationService.getAllPersonVacations(personId);
        return ResponseEntity.ok(vacations);
    }
    @GetMapping(value = "/vacations", params = {"!sort", "!page", "!size"})
    ResponseEntity<List<HolidayLeave>> readAllVacations(){
        List<HolidayLeave> vacations = vacationService.getAllVacations();
        return ResponseEntity.ok(vacations);
    }
    @GetMapping("vacations/status/{taskStatus}")
    public ResponseEntity<List<HolidayLeave>> getVacationsByTaskStatus(@PathVariable String taskStatus) {
        List<HolidayLeave> vacations = vacationService.getVacationByTaskStatus(taskStatus);
        System.out.println(vacations);
        return ResponseEntity.ok(vacations);
    }
    @GetMapping("/vacations/{id}")
    ResponseEntity<HolidayLeave> readVacation(@PathVariable int id){
        return vacationService.getVacationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/vacations/{id}")
    ResponseEntity<Void> updateVacation(@PathVariable int id, @RequestBody HolidayLeave toUpdate){
        vacationService.updateVacation(id, toUpdate);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/vacations/{id}")
    ResponseEntity<Void> deleteVacation(@PathVariable int id) {
        vacationService.deleteVacation(id);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/vacations/acceptStatus/{id}")
    ResponseEntity<Void> acceptVacationStatus(
            @PathVariable int id,
            @RequestBody HolidayLeave updatedVacation
    ) {
        vacationService.updateVacation(id, updatedVacation);
        return ResponseEntity.noContent().build();
    }

}
