package com.vacation.com.vacation.Repository;

import com.vacation.com.vacation.Model.Correspondence;
import com.vacation.com.vacation.Model.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CorrespondenceRepository extends JpaRepository<Correspondence, Integer> {
    List<Correspondence> findAll();
    Correspondence save(Correspondence correspondence);

}
