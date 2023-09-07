package com.vacation.com.vacation.DocumentService;

import com.vacation.com.vacation.Model.Document;
import com.vacation.com.vacation.Repository.DocumentRepository;
import com.vacation.com.vacation.Service.DocumentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

public class DocumentServiceTest {

    @InjectMocks
    private DocumentService documentService;

    @Mock
    private DocumentRepository documentRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testUserDocumentWhenDocumentExists() {

        int personId = 1;
        int vacationId = 2;
        Document existingDocument = new Document();
        existingDocument.setPersonId(personId);
        existingDocument.setVacationId(vacationId);

        when(documentRepository.findByPersonIdAndVacationId(personId, vacationId))
                .thenReturn(existingDocument);

        String result = documentService.userDocument(personId, vacationId);

        assertEquals("exist", result);
    }

    @Test
    public void testUserDocumentWhenDocumentDoesNotExist() {
        int personId = 1;
        int vacationId = 2;

        when(documentRepository.findByPersonIdAndVacationId(personId, vacationId))
                .thenReturn(null);

        String result = documentService.userDocument(personId, vacationId);

        assertEquals("notExist", result);
    }
}