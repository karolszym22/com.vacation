package com.vacation.com.vacation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import java.util.List;

@RepositoryRestResource(path = "vacations", collectionResourceRel = "vacations")
interface HolidayLeaveRepository extends JpaRepository<HolidayLeave, Integer>{
 @Override
 @RestResource(exported = false)
    void deleteById(Integer integer);
 @Override
 @RestResource(exported = false)
    void delete(HolidayLeave holidayLeave);

 @RestResource(path = "great!")
 List<HolidayLeave> findByDoneIsTrue();
}
