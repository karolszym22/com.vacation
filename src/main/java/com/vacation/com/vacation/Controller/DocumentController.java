package com.vacation.com.vacation.Controller;

import com.vacation.com.vacation.Model.Document;
import com.vacation.com.vacation.Service.DocumentService;
import org.apache.poi.xwpf.usermodel.ParagraphAlignment;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.apache.poi.xwpf.usermodel.XWPFRun;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/document/word")
public class DocumentController {

    private final DocumentService documentService;

    @Autowired
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
    public ResponseEntity<byte[]> downloadDocument(@RequestBody Map<String, Integer> requestData){
        int personId = requestData.get("personId");
        int vacationId = requestData.get("vacationId");
        Document document = documentService.getCurrentDocument(personId, vacationId);


        String description = "Niniejszym składam wniosek o udzielenie w dniach od 02.05.2023 do 02.09.2023\n" +
        "przysługującego za rok 2023 urlopu wypoczynkowego. Powód: " + document.getDescription() ;
        String comment = document.getDescription();
        String taskStatus = document.getTaskStatus();
        String employerName = "Pracownik" + document.getEmployerName();

        XWPFDocument wordDocument = new XWPFDocument();


        XWPFParagraph dateParagraph = wordDocument.createParagraph();
        dateParagraph.setAlignment(ParagraphAlignment.RIGHT);
        XWPFRun dateRun = dateParagraph.createRun();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String currentDate = dateFormat.format(new Date());
        dateRun.setText(currentDate);


        XWPFParagraph titleParagraph = wordDocument.createParagraph();
        titleParagraph.setAlignment(ParagraphAlignment.CENTER);
        titleParagraph.setSpacingBefore(900);
        titleParagraph.setSpacingAfter(900);
        XWPFRun titleRun = titleParagraph.createRun();
        titleRun.setText("WNIOSEK URLOPOWY");
        titleRun.setFontSize(36);


        XWPFParagraph descriptionParagraph = wordDocument.createParagraph();
        descriptionParagraph.setAlignment(ParagraphAlignment.CENTER);
        descriptionParagraph.setSpacingAfter(200);
        XWPFRun descriptionRun = descriptionParagraph.createRun();
        descriptionRun.setText(description);


        XWPFParagraph commentParagraph = wordDocument.createParagraph();
        commentParagraph.setAlignment(ParagraphAlignment.LEFT);
        commentParagraph.setSpacingAfter(3000);
        XWPFRun commentRun = commentParagraph.createRun();



        XWPFParagraph statusParagraph = wordDocument.createParagraph();
        statusParagraph.setAlignment(ParagraphAlignment.RIGHT);
        statusParagraph.setSpacingBefore(7000);
        XWPFRun statusRun = statusParagraph.createRun();
        statusRun.setText("Status: ");
        statusRun.setFontSize(26);
        statusRun.setBold(true);

        XWPFParagraph employerNameParagraph = wordDocument.createParagraph();
        employerNameParagraph.setAlignment(ParagraphAlignment.LEFT);
        employerNameParagraph.setSpacingBefore(1200);
        XWPFRun employerNameRun = employerNameParagraph.createRun();
        employerNameRun.setText(employerName);
        employerNameRun.setFontSize(14);

        if (taskStatus.equals("Zrealizowano")) {
            statusRun.setColor("008000");
            statusRun.setBold(true);
            statusRun.setText("Zrealizowany");
        } else {
            statusRun.setColor("FF0000");
            statusRun.setBold(true);
            statusRun.setText("Niezrealizowany");
        }

        try (FileOutputStream out = new FileOutputStream(new File("wniosek_urlopowy.docx"))) {
            wordDocument.write(out);
            System.out.println("Dokument Word został wygenerowany.");
        } catch (IOException e) {
            e.printStackTrace();

        }return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
