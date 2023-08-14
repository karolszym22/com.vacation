package Repository;

import Model.HolidayLeave;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface HolidayLeaveRepository {
    List<HolidayLeave> findAll();

    Page<HolidayLeave> findAll(Pageable page);
    Optional<HolidayLeave> findById(Integer id);
    void deleteById(Integer id);
    boolean existsById(Integer id);
    HolidayLeave save(HolidayLeave entity);

}
