package com.vacation.com.vacation.Repository;

import com.vacation.com.vacation.Model.HolidayLeave;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

public interface HolidayLeaveRepository {
    List<HolidayLeave> findAll();
    List<HolidayLeave> findByPersonId(Integer personId);
    Page<HolidayLeave> findAll(Pageable page);
    Optional<HolidayLeave> findById(Integer id);
    List<HolidayLeave> findByTaskStatus(String taskStatus);
    void deleteById(Integer id);
    boolean existsById(Integer id);
    HolidayLeave save(HolidayLeave entity);

}