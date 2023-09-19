package com.vacation.com.vacation.Controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@RestController
public class SessionController {
    @GetMapping("/")
    public String helloAdmin() {
        return "hello admin";
    }


    @GetMapping("/secured")
    public String secured() {return "Hello, Secured!";}

    @GetMapping("/csrf-token")
    public CsrfToken csrf(CsrfTokenRepository csrfTokenRepository) {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        return csrfTokenRepository.loadToken(request);
    }
}
