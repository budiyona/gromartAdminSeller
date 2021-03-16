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
        if (userService.isEmailExist(email)&&userService.isUserActive(email)) {
            User target = userService.login(email);
            if (target.getPassword().equals(password)) {
                target.setPassword(null);
                return new ResponseEntity<>(target, HttpStatus.OK);
            }
            return new ResponseEntity<>("Username/Password incorrect", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>("Account not Found or Inactive, please contact support", HttpStatus.NOT_FOUND);
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
                return new ResponseEntity<>("Phone already Exist", HttpStatus.CONFLICT);
            }
            return new ResponseEntity<>("Email already Exist", HttpStatus.CONFLICT);
        }
    }



    @GetMapping("/user/count-seller")
    public ResponseEntity<?> getNumberOfSeller(@RequestParam String status) {
        switch (status) {
            case "active":
            case "inactive":
            case "requested":
                return new ResponseEntity<>(
                        userService.countSeller("and status = '" + status + "'"),
                        HttpStatus.OK);
            case "all":
                return new ResponseEntity<>(
                        userService.countSeller(""),
                        HttpStatus.OK);
            default:
                return new ResponseEntity<>("request not found",
                        HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/user/seller")
    public ResponseEntity<?> getSeller(@RequestParam int offset) {
        return new ResponseEntity(userService.getSeller(offset), HttpStatus.OK);
    }

    @PutMapping("/user/status")
    public ResponseEntity<?> updateStatus(@RequestParam String id, String status, String idAdmin) {
        int result = userService.updateStatus(id, status, idAdmin);
        if (result >= 1) {
            return new ResponseEntity<>("Update Success id =" + id + " status = " + status, HttpStatus.OK);
        }
        return new ResponseEntity<>("update failed", HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/user/product-limit")
    public ResponseEntity<?> updateProductQty(@RequestParam String id, int limitProduct, String idAdmin) {
        int result = userService.updateProductQty(id, limitProduct, idAdmin);

        return new ResponseEntity<>("ok", HttpStatus.OK);
    }

    @PutMapping("/user/{id}")
    public ResponseEntity<?> updateUser(@RequestParam String id, @Valid @RequestBody User user, Errors error) {
        if (error.hasErrors()) {
            return new ResponseEntity<>(error.getFieldError().getDefaultMessage(), HttpStatus.BAD_REQUEST);
        } else {
            if (userService.isExist(user.getUserCode())) {
                User dbUser = userService.findById(user.getUserCode());
                if (!userService.isPhoneExist(user.getPhone()) || dbUser.getUserName().equals(user.getUserName())) {
                    if (!userService.isPhoneExist(user.getPhone()) || dbUser.getPhone().equals(user.getPhone())) {
                        userService.updateUser(user);
                        return new ResponseEntity<>("Update Success", HttpStatus.OK);
                    }
                }
            }
            return new ResponseEntity<>("User Not Found", HttpStatus.NOT_FOUND);
        }
    }

}
