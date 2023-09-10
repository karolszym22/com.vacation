package com.vacation.com.vacation.UserService;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

import com.vacation.com.vacation.Model.UserEntity;
import com.vacation.com.vacation.Repository.UserRepository;
import com.vacation.com.vacation.Service.UserService;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

public class UserRegisterTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testRegisterUser() {

        UserEntity newUser = new UserEntity();
        newUser.setEmail("test@example.com");
        newUser.setPassword("testPassword");


        when(userRepository.findByEmail(anyString())).thenReturn(null);


        boolean isRegistered = userService.registerUser(newUser);


        assertTrue(isRegistered);


        verify(userRepository, times(1)).save(newUser);
    }
    @Test
    public void testRegisterUserWhenUserExists() {

        UserEntity existingUser = new UserEntity();
        existingUser.setEmail("test@example.com");
        existingUser.setPassword("testPassword");

        when(userRepository.findByEmail(anyString())).thenReturn(existingUser);


        UserEntity newUser = new UserEntity();
        newUser.setEmail("test@example.com");
        newUser.setPassword("newPassword");


        boolean isRegistered = userService.registerUser(newUser);

        assertFalse(isRegistered);
        verify(userRepository, never()).save(newUser);
    }
}