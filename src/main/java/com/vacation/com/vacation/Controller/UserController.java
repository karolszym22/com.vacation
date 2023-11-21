package com.vacation.com.vacation.Controller;

import com.vacation.com.vacation.Model.UserExistResponse;
import com.vacation.com.vacation.Model.UserEntity;
import com.vacation.com.vacation.Service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
public class UserController {
    private final UserService userService;
    private final boolean exist = false;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/newUser")
    public ResponseEntity<String> registerUser(@RequestBody UserEntity user) {
        if (userService.registerUser(mapToUserEntity(user))) {
            return ResponseEntity.ok("User registered!");
        } else {
            return ResponseEntity.badRequest().body("User exists!");
        }

    }
    @GetMapping("/user-data")
    public ResponseEntity<?> getUserData(HttpSession session) {
        Integer loggedInUserId = (Integer) session.getAttribute("loggedInUserId");
        if (loggedInUserId != null) {

            UserEntity user = userService.getUserById(loggedInUserId);

            if (user != null) {
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }
    }
    @PostMapping("/login")
    public ResponseEntity<UserEntity> loginUser(@RequestBody UserEntity user, HttpSession session) {
        boolean loggedIn = userService.loginUser(user.getEmail(), user.getPassword());
        if (loggedIn) {
            UserEntity loggedInUser = userService.getUserByEmail(user.getEmail());
            String token = UUID.randomUUID().toString();
            session.setAttribute("userToken", token);
            session.setAttribute("loggedInUserId", loggedInUser.getId());
            loggedInUser.setToken(token);

            return ResponseEntity.ok(loggedInUser);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }


    @GetMapping("/exist")
    public ResponseEntity<UserExistResponse> checkExist() {
        UserExistResponse response = new UserExistResponse(exist);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/NewUser")
    public ResponseEntity<List<UserEntity>> getAllUsers() {
        List<UserEntity> users = userService.getAllUsers();

        return ResponseEntity.ok(users);
    }

    private UserEntity mapToUserEntity(UserEntity credentials) {
        UserEntity user = new UserEntity();
        user.setUsername(credentials.getUsername());
        user.setPassword(credentials.getPassword());
        user.setEmail(credentials.getEmail());
        user.setEmployerType((credentials.getEmployerType()));
        user.setInitialsColor(credentials.getInitialsColor());
        return user;
    }
}

