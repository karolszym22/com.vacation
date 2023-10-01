package com.vacation.com.vacation.DocumentService;

import com.vacation.com.vacation.Model.Document;
import com.vacation.com.vacation.Repository.DocumentRepository;
import com.vacation.com.vacation.Service.DocumentService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class DocumentServiceTest {

    @InjectMocks
    private DocumentService documentService;

    @Mock
    private DocumentRepository documentRepository;

    @Test
    public void testUserDocumentWhenDocumentExists() {
        //(given)
        int personId = 1;
        int vacationId = 2;
        Document existingDocument = new Document();
        existingDocument.setPersonId(personId);
        existingDocument.setVacationId(vacationId);

        when(documentRepository.findByPersonIdAndVacationId(personId, vacationId))
                .thenReturn(existingDocument);

        // (when)
        String result = documentService.userDocument(personId, vacationId);

        // (then)
        assertEquals("exist", result);
    }

    @Test
    public void testUserDocumentWhenDocumentDoesNotExist() {
        //(given)
        int personId = 1;
        int vacationId = 2;

        when(documentRepository.findByPersonIdAndVacationId(personId, vacationId))
                .thenReturn(null);

        // (when)
        String result = documentService.userDocument(personId, vacationId);

        // (then)
        assertEquals("notExist", result);
    }
}
