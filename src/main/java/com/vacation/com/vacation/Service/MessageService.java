package com.vacation.com.vacation.Service;
import com.vacation.com.vacation.Model.HolidayLeave;
import com.vacation.com.vacation.Model.Message;
import com.vacation.com.vacation.Repository.MessageRepository;
import org.springframework.stereotype.Service;

@Service
public class MessageService {
    private final MessageRepository messageRepository;
    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }
    public void createVacation(Message message) {
        messageRepository.save(message);
    }
}
