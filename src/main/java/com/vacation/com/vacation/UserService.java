package com.vacation.com.vacation;

import com.vacation.com.vacation.Model.UserEntity;
import com.vacation.com.vacation.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void registerUser(UserEntity user) {
        UserEntity existingUser = userRepository.findByUsername(user.getUsername());
        if (existingUser == null) {
            userRepository.save(user);
        }
    }

    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }
}
