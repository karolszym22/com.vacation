package com.vacation.com.vacation.Service;

import com.vacation.com.vacation.Model.Document;
import com.vacation.com.vacation.Model.UserEntity;
import com.vacation.com.vacation.Repository.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class DocumentService {

    private final DocumentRepository documentRepository;

    @Autowired
    public DocumentService(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    public Document createDocument(Document document) {
        document.setCurrentData(new Date());
        return documentRepository.save(document);
    }
    public String userDocument(int personId, int vacationId) {
        Document document = documentRepository.findByPersonIdAndVacationId(personId, vacationId);
        if (document != null && document.getVacationId() == vacationId) {
            return "exist";
        } else {
            return "notExist";
        }
    }
    public List<Document> getAllDocuments() {
        return documentRepository.findAll();
    }
}
