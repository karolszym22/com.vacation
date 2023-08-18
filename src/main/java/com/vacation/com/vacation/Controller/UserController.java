package com.vacation.com.vacation.Controller;

import com.vacation.com.vacation.Repository.UserRepository;
import com.vacation.com.vacation.UserCredentials;
import com.vacation.com.vacation.Model.UserEntity;
import com.vacation.com.vacation.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/NewUser")
    public ResponseEntity<String> registerUser(@RequestBody UserCredentials credentials) {
        userService.registerUser(mapToUserEntity(credentials));
        return ResponseEntity.ok("User registered successfully");
    }

    @GetMapping("/NewUser")
    public ResponseEntity<List<UserEntity>> getAllUsers() {
        List<UserEntity> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    private UserEntity mapToUserEntity(UserCredentials credentials) {
        UserEntity user = new UserEntity();
        user.setUsername(credentials.getUsername());
        user.setPassword(credentials.getPassword());
        return user;
    }
}

