package com.noteboard.note.controller;


import com.noteboard.note.model.User;
import com.noteboard.note.service.LoginService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/login")
public class LoginController {

    private final LoginService loginService;

    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping
    public ResponseEntity<?> login(@RequestBody User user) {
        boolean isAuthenticated = loginService.authenticate(user.getUsername(), user.getPassword());
        if (isAuthenticated) {
            // If authenticated, redirect the user to '/users'
            HttpHeaders headers = new HttpHeaders();
            headers.add("Location", "/users");
            return new ResponseEntity<>(headers, HttpStatus.FOUND); // or HttpStatus.SEE_OTHER
        } else {
            // If authentication fails, return 401 Unauthorized status
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

}
