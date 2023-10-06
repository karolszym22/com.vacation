package com.vacation.com.vacation.Controller;
import com.vacation.com.vacation.Model.Correspondence;
import com.vacation.com.vacation.Model.HolidayLeave;
import com.vacation.com.vacation.Model.Message;
import com.vacation.com.vacation.Service.CorrespondenceService;
import com.vacation.com.vacation.Service.MessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

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
}
