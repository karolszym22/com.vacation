package com.vacation.com.vacation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
interface HolidayLeaveRepository extends JpaRepository<HolidayLeave, Integer>{

}
