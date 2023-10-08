package com.vacation.com.vacation.Repository;

import com.vacation.com.vacation.Model.Document;
import com.vacation.com.vacation.Model.Message;
import com.vacation.com.vacation.Model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Integer>  {
    List<Message> findAll();
    List<Message> findByCorrespondenceId(int correspondenceId);
    Message save(Message message);
}
