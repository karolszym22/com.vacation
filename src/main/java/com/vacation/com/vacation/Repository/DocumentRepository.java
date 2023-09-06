package com.vacation.com.vacation.Repository;
import com.vacation.com.vacation.Model.Document;
import com.vacation.com.vacation.Model.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;

public interface DocumentRepository  extends JpaRepository<Document, Integer> {

    Document findByVacationId(Integer vacationId);
    Document save(Document entity);
    Document  findById(int id);

    Document findByVacationId(int vacationId);
    Document findByPersonIdAndVacationId(int personId, int vacationId);
}