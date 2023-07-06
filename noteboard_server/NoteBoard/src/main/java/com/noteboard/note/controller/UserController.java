package com.noteboard.note.controller;

import com.noteboard.note.dao.NoteDao;
import com.noteboard.note.dao.UserDao;
import com.noteboard.note.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/users")
public class UserController {

    private final UserDao userDao;

    public UserController(UserDao userDao) {
        this.userDao = userDao;
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userDao.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable int userId) {
        User user = userDao.getUserById(userId);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Other endpoints

    // Example: Create a new user
    @PostMapping
    public ResponseEntity<String> createUser(@RequestBody User user) {
       userDao.createUser(user);
       return ResponseEntity.status(HttpStatus.CREATED).body("User created successfully");
    }
}
