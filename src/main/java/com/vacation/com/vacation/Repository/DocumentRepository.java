package com.vacation.com.vacation.Repository;
import com.vacation.com.vacation.Model.Document;
import org.springframework.data.jpa.repository.JpaRepository;


public interface DocumentRepository  extends JpaRepository<Document, Integer> {

    Document findByVacationId(Integer vacationId);
    Document save(Document entity);
    Document  findById(int id);

    Document findByVacationId(int vacationId);
    Document findByPersonIdAndVacationId(int personId, int vacationId);
}