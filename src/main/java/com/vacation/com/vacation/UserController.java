package com.vacation.com.vacation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserCredentials credentials) {
        UserEntity existingUser = userRepository.findByUsername(credentials.getUsername());
        if (existingUser != null) {
            return ResponseEntity.status(400).body("User already exists");
        }

        UserEntity newUser = new UserEntity();
        newUser.setUsername(credentials.getUsername());
        newUser.setPassword(credentials.getPassword());

        userRepository.save(newUser);

        return ResponseEntity.ok("User registered successfully");
    }
    @GetMapping("/register")
    public ResponseEntity<List<UserEntity>> getAllUsers() {
        List<UserEntity> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

}
