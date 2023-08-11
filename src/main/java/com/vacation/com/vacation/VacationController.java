package com.vacation.com.vacation;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
class VacationController {
    private static final Logger logger = LoggerFactory.getLogger(VacationController.class);
    private final HolidayLeaveRepository repository;
    
    VacationController(final HolidayLeaveRepository repository){
        this.repository = repository;
    }
    @GetMapping( value = "/vacations", params = {"!sort", "!page", "!size"})
    ResponseEntity<List<HolidayLeave>>  readAllVacations(){
        logger.warn("asdasdasdasda");
        return ResponseEntity.ok(repository.findAll()) ;
    }
    @GetMapping("/vacations")
    ResponseEntity <List<HolidayLeave>>  readAllVacations(Pageable page){
        logger.warn("asdasdasdasda");
        return ResponseEntity.ok(repository.findAll(page).getContent()) ;
    }
}