package com.nextsoft.gromart.controller;

import com.nextsoft.gromart.model.User;
import com.nextsoft.gromart.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    UserService userService;


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String email, String password) {
        User target = userService.findByEmail(email);
        if (target != null) {
            if (target.getPassword().equals(password)) {
                target.setPassword(null);
                return new ResponseEntity<>(target, HttpStatus.OK);
            }
            return new ResponseEntity<>("Username/Password incorrect", HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>("Account not Found", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/test")
    public ResponseEntity<?> testConnection() {
        return new ResponseEntity<>("GOOD", HttpStatus.OK);
    }
}
