package com.vacation.com.vacation.Controller;

import com.vacation.com.vacation.Model.Correspondence;
import com.vacation.com.vacation.Model.CorrespondenceAndMessageDTO;
import com.vacation.com.vacation.Model.Message;
import com.vacation.com.vacation.Service.CorrespondenceService;
import com.vacation.com.vacation.Service.MessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.List;

@RestController
public class CorrespondenceController {
    private final CorrespondenceService correspondenceService;
    private final MessageService messageService;
    public CorrespondenceController(CorrespondenceService correspondenceService,  MessageService messageService) {
        this.correspondenceService = correspondenceService;
        this.messageService = messageService;

    }

    @PostMapping("/newCorrespondenceAndMessage")
    ResponseEntity<CorrespondenceAndMessageDTO> addCorrespondenceAndMessage(@RequestBody CorrespondenceAndMessageDTO dto) {
        Correspondence correspondence = dto.getCorrespondence();
        Message message = dto.getMessage();

        correspondenceService.addingCorrespondence(correspondence);
        message.setCorrespondenceId(correspondence.getId());
        messageService.addingMessage(message);

        return ResponseEntity.created(URI.create("/" + correspondence.getId())).body(dto);
    }
    @GetMapping(value = "/correspondences", params = {"!sort", "!page", "!size"})
    ResponseEntity<List<Correspondence>> readAllVacations(){
        List<Correspondence> correspondences = correspondenceService.getAllCorrespondence();
        return ResponseEntity.ok(correspondences);
    }

}
