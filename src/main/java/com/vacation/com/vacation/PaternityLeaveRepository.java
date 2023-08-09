package com.vacation.com.vacation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RepositoryRestResource(path = "paternity-leaves", collectionResourceRel = "paternity-leaves")
public interface PaternityLeaveRepository extends JpaRepository<PaternityLeave, Integer> {
    // Dodaj tutaj odpowiednie metody zgodnie z potrzebami
}
