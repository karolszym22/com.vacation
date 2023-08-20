package com.vacation.com.vacation;

import com.vacation.com.vacation.Model.UserEntity;
import com.vacation.com.vacation.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean registerUser(UserEntity user) {
        UserEntity existingUser = userRepository.findByUsername(user.getUsername());
        if (existingUser == null) {
            userRepository.save(user);
            System.out.println("User registered!");
            return true;
        } else {
            System.out.println("User exists!");
            return false;
        }
    }

    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }
}
