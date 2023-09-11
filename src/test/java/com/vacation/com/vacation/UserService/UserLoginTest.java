package com.vacation.com.vacation.UserService;

import com.vacation.com.vacation.Model.UserEntity;
import com.vacation.com.vacation.Repository.UserRepository;
import com.vacation.com.vacation.Service.UserService;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.*;

public class UserLoginTest {

    @Mock
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
        userService = new UserService(userRepository);
    }

    @Test
    public void testLoginUserSuccessful() {
        UserEntity user = new UserEntity();
        user.setEmail("test@example.com");
        user.setPassword("password123");
        when(userRepository.findByEmail("test@example.com")).thenReturn(user);

        boolean result = userService.loginUser("test@example.com", "password123");

        assertTrue(result);
    }

    @Test
    public void testLoginUserFailed() {
        when(userRepository.findByEmail("nonexistent@example.com")).thenReturn(null);

        boolean result = userService.loginUser("nonexistent@example.com", "wrongpassword");

        assertFalse(result);
    }
}
