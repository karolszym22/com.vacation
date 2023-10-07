package com.vacation.com.vacation.Service;

import com.vacation.com.vacation.Model.HolidayLeave;
import com.vacation.com.vacation.Model.Message;
import com.vacation.com.vacation.Model.UserEntity;
import com.vacation.com.vacation.Repository.MessageRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService  {

    private final MessageRepository messageRepository;

    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }
    public void addingMessage(Message message) {
         messageRepository.save(message);
    };
    public List<Message> getAllVacations() {;
        return messageRepository.findAll();
    }

    public List<Message> getCorrespondenceMessages(int corespondenceId) {
        return messageRepository.findByCorrespondenceId(corespondenceId);
    }

}
