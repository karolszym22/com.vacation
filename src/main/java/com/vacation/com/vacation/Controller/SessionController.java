package com.vacation.com.vacation.Controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@RestController
public class SessionController {
    private CsrfToken csrfToken;
    @GetMapping("/")
    public String helloAdmin() {
        return "hello admin";
    }


    @GetMapping("/secured")
    public String secured() {return "Hello, Secured!";}


}
