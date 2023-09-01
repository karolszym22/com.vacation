package com.vacation.com.vacation.Service;

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
        UserEntity existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser == null) {
            userRepository.save(user);
            System.out.println("User registered!");
            return true;
        } else {
            System.out.println("User exists!");
            return false;
        }
    }
    public boolean loginUser(String email, String password) {
        UserEntity user = userRepository.findByEmail(email);
        if (user != null && user.getPassword().equals(password)) {
            System.out.println("Login successful!");
            return true;
        } else {
            System.out.println("Login failed!");
            return false;
        }
    }
    public UserEntity getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }
}
