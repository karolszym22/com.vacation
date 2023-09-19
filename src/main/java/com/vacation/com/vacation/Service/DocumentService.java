package com.vacation.com.vacation.Service;

import com.vacation.com.vacation.Model.Document;
import com.vacation.com.vacation.Repository.DocumentRepository;
import org.apache.poi.xwpf.usermodel.ParagraphAlignment;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.apache.poi.xwpf.usermodel.XWPFRun;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
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

    public Document getCurrentDocument(int personId, int vacationId){

        return documentRepository.findByPersonIdAndVacationId(personId,  vacationId);

    }

    public void generateAndSaveDocument(int personId, int vacationId, Document document) {

        Date startDate = document.getStartDate();
        Date endDate = document.getEndDate();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String startDateStr = dateFormat.format(startDate);
        String endDateStr = dateFormat.format(endDate);

        String description = "Niniejszym składam wniosek o udzielenie w dniach od " + startDateStr + " do " + endDateStr +
                "przysługującego za rok 2023 urlopu wypoczynkowego. Powód: " + document.getDescription();
        String taskStatus = document.getTaskStatus();
        String employerName = "Pracownik " + document.getEmployerName();
        String daysNum = "Liczba dni: " + document.getDaysNum();

        XWPFDocument wordDocument = new XWPFDocument();

        XWPFParagraph dateParagraph = wordDocument.createParagraph();
        dateParagraph.setAlignment(ParagraphAlignment.RIGHT);
        XWPFRun dateRun = dateParagraph.createRun();
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
        descriptionRun.setFontSize(14);

        XWPFParagraph daysNumParagraph = wordDocument.createParagraph();
        daysNumParagraph.setAlignment(ParagraphAlignment.CENTER);
        daysNumParagraph.setSpacingBefore(700);
        XWPFRun daysNumRun = daysNumParagraph.createRun();
        daysNumRun.setText(daysNum);
        daysNumRun.setFontSize(14);
        daysNumRun.setBold(true);

        XWPFParagraph statusParagraph = wordDocument.createParagraph();
        statusParagraph.setAlignment(ParagraphAlignment.RIGHT);
        statusParagraph.setSpacingBefore(7000);
        XWPFRun statusRun = statusParagraph.createRun();
        statusRun.setText("Status: ");
        statusRun.setFontSize(26);
        statusRun.setBold(true);

        XWPFParagraph employerNameParagraph = wordDocument.createParagraph();
        employerNameParagraph.setAlignment(ParagraphAlignment.LEFT);
        employerNameParagraph.setSpacingBefore(400);
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
            System.out.println("Dokument Word został wygenerowany i zapisany.");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
