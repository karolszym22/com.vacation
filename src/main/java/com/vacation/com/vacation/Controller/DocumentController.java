package com.vacation.com.vacation.Controller;
import com.vacation.com.vacation.Model.Document;
import com.vacation.com.vacation.Service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/document/word")
public class DocumentController {

    private final DocumentService documentService;
    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    @PostMapping
    public ResponseEntity<Document> createDocument(@RequestBody Document document) {
        Document savedDocument = documentService.createDocument(document);
        return new ResponseEntity<>(savedDocument, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Document>> getAllDocuments() {
        List<Document> documents = documentService.getAllDocuments();
        if (!documents.isEmpty()) {
            return new ResponseEntity<>(documents, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/exist")
    public ResponseEntity<String> checkDocumentExistence(
            @RequestParam("personId") int personId,
            @RequestParam("vacationId") int vacationId) {
        String existenceStatus = documentService.userDocument(personId, vacationId);
        return new ResponseEntity<>(existenceStatus, HttpStatus.OK);
    }
    @PostMapping("/download")
    public ResponseEntity<byte[]> downloadDocument(@RequestBody Map<String, Integer> requestData) {
        int personId = requestData.get("personId");
        int vacationId = requestData.get("vacationId");
        Document document = documentService.getCurrentDocument(personId, vacationId);

        documentService.generateAndSaveDocument(personId, vacationId, document);

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
