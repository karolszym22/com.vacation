package com.vacation.com.vacation.UserService;

import com.vacation.com.vacation.Model.UserEntity;
import com.vacation.com.vacation.Repository.UserRepository;
import com.vacation.com.vacation.Service.UserService;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.when;

public class UserLoginTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testLoginUserSuccessful() {
        UserEntity user = new UserEntity();
        user.setEmail("test@example.com");
        user.setPassword("password123");

        // Given
        when(userRepository.findByEmail("test@example.com")).thenReturn(user);

        // When
        boolean result = userService.loginUser("test@example.com", "password123");

        // Then
        assertTrue(result);
    }

    @Test
    public void testLoginUserFailed() {
        when(userRepository.findByEmail("nonexistent@example.com")).thenReturn(null);

        boolean result = userService.loginUser("nonexistent@example.com", "wrongpassword");

        assertFalse(result);
    }
}