package com.vacation.com.vacation.Repository;
import com.vacation.com.vacation.Model.Document;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


import java.util.List;

public interface DocumentRepository {
    List<Document> findAll();
    List<Document> findByVacationId(Integer vacationId);
    Page<Document> findAll(Pageable page);
    Document save(Document entity);

}