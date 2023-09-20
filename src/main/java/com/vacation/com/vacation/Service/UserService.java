package com.vacation.com.vacation.Service;

import com.vacation.com.vacation.Model.UserEntity;
import com.vacation.com.vacation.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("Użytkownik nie znaleziony: " + email);
        }

        List<GrantedAuthority> authorities = new ArrayList<>();

        return new User(
                user.getEmail(),
                user.getPassword(),
                authorities
        );
    }

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
    public UserEntity getUserById(int id){return userRepository.findById(id);}
    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }
}
