package com.nextsoft.gromart.controller;

import com.nextsoft.gromart.model.User;
import com.nextsoft.gromart.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/user/{id}")
    public ResponseEntity<?> getUserById(@PathVariable String id) {
        if (userService.isExist(id)) {
            User target = userService.findById(id);
            return new ResponseEntity<>(target, HttpStatus.OK);
        }
        return new ResponseEntity<>("Email not Found", HttpStatus.NOT_FOUND);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String email, String password) {
        if (userService.isEmailExist(email)) {
            User target = userService.login(email);
            if (target.getPassword().equals(password)) {
                target.setPassword(null);
                return new ResponseEntity<>(target, HttpStatus.OK);
            }
            return new ResponseEntity<>("Username/Password incorrect", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>("Account not Found", HttpStatus.NOT_FOUND);
    }

    @PostMapping("/user")
    public ResponseEntity<?> register(@Valid @RequestBody User user, Errors error) {
        if (error.hasErrors()) {
            return new ResponseEntity<>(error.getFieldError().getDefaultMessage(), HttpStatus.BAD_REQUEST);
        } else {
            if (!userService.isEmailExist(user.getEmail())) {
                if (!userService.isPhoneExist(user.getPhone())) {
                    userService.save(user);
                    return new ResponseEntity<>("Register Success", HttpStatus.OK);
                }
                return new ResponseEntity<>("Phone already Exist",HttpStatus.CONFLICT);
            }
            return new ResponseEntity<>("Email already Exist", HttpStatus.CONFLICT);
        }
    }

    @GetMapping("/test")
    public ResponseEntity<?> testConnection() {

        return new ResponseEntity<>(userService.isEmailExist("email@gmail.com"), HttpStatus.OK);
    }
}
