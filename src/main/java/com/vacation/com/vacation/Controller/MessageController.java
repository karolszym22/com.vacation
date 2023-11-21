package com.vacation.com.vacation.Controller;
import com.vacation.com.vacation.Model.Correspondence;
import com.vacation.com.vacation.Model.HolidayLeave;
import com.vacation.com.vacation.Model.Message;
import com.vacation.com.vacation.Model.UserEntity;
import com.vacation.com.vacation.Service.CorrespondenceService;
import com.vacation.com.vacation.Service.MessageService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
public class MessageController {
    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping("/newMessage")
    ResponseEntity<Message> addingVacation(@RequestBody Message toCreate){
        messageService.addingMessage(toCreate);
        return ResponseEntity.created(URI.create("/" + toCreate.getId())).body(toCreate);
    }
    @GetMapping(value = "/messages", params = {"!sort", "!page", "!size"})
    ResponseEntity<List<Message>> readAllVacations(){
        List<Message> messages = messageService.getAllVacations();
        return ResponseEntity.ok(messages);
    }


    @PostMapping("/coresspondenceMessages")
    ResponseEntity<List<Message>> getCorrespondenceMessages(@RequestBody Map<String, Integer> requestBody) {
        if (requestBody.containsKey("corespondenceId")) {
            int correspondenceId = requestBody.get("corespondenceId");
            List<Message> correspondenceMessages = messageService.getCorrespondenceMessages(correspondenceId);
            if (correspondenceMessages.isEmpty()) {
                return ResponseEntity.notFound().build();
            } else {
                return ResponseEntity.ok(correspondenceMessages);

            }
        } else {
            return ResponseEntity.badRequest().build();
        }
    }
}
