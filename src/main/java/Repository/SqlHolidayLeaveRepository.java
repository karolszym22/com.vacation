package Repository;

import Model.HolidayLeave;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public
interface SqlHolidayLeaveRepository extends HolidayLeaveRepository, JpaRepository<HolidayLeave, Integer>{
    @RestResource(path = "done", rel = "done")
    List<HolidayLeave> findByDone(@Param("state") boolean done);
}
