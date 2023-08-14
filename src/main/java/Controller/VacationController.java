package Controller;

import Model.HolidayLeave;
import Repository.HolidayLeaveRepository;
import Repository.SqlHolidayLeaveRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
class VacationController {
    private static final Logger logger = LoggerFactory.getLogger(VacationController.class);
    private final HolidayLeaveRepository repository;

    VacationController(final SqlHolidayLeaveRepository repository){
        this.repository = repository;
    }

    @PostMapping("/vacations")
    ResponseEntity<HolidayLeave> createVacation(@RequestBody HolidayLeave toCreate){
        HolidayLeave result = repository.save(toCreate);
                return ResponseEntity.created(URI.create("/" + result.getId())).body(result);
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

    @GetMapping("/vacations/{id}")
    ResponseEntity<HolidayLeave> readTask(@PathVariable int id){
        return repository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    };
    @PutMapping("/vacations/{id}")
    ResponseEntity<?> updateVacation(@PathVariable int id, @RequestBody HolidayLeave toUpdate){
        if (!repository.existsById(id))
        {
            return ResponseEntity.notFound().build();
        }
        toUpdate.setId(id);
        repository.save(toUpdate);
        return ResponseEntity.noContent().build();
    }
    @DeleteMapping("/vacations/{id}")
    ResponseEntity<?> deleteVacation(@PathVariable int id) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
