package com.nextsoft.gromart.controller;

import com.nextsoft.gromart.model.User;
import com.nextsoft.gromart.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;

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
            target.setPassword(null);
            return new ResponseEntity<>(target, HttpStatus.OK);
        }
        return new ResponseEntity<>("Email not Found", HttpStatus.NOT_FOUND);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String email, String password) {
//        System.out.println("email"+email+"   "+userService.isEmailExist(email));

        if (userService.isEmailExist(email) && userService.isUserActive(email)) {
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
    public ResponseEntity<?> updateUser(@PathVariable String id, @Valid @RequestBody User user, Errors error) {
//        System.out.println("idddddddddddddddddddddddddd"+id);
//        return new ResponseEntity<>("User Not Found", HttpStatus.OK);
        if (error.hasErrors()) {
            return new ResponseEntity<>(error.getFieldError().getDefaultMessage(), HttpStatus.BAD_REQUEST);
        } else {
            if (userService.isExist(id)) {
                User dbUser = userService.findById(id);
//                System.out.println(!userService.isPhoneExist(user.getPhone()));
//                System.out.println(!userService.isPhoneExist(user.getPhone()));
//                System.out.println(dbUser.getUserName().equals(user.getUserName()));
//                System.out.println(dbUser.getPhone().equals(user.getPhone()));
//
                if (!userService.isEmailExist(user.getEmail()) || dbUser.getEmail().equals(user.getEmail())) {
                    if (!userService.isPhoneExist(user.getPhone()) || dbUser.getPhone().equals(user.getPhone())) {
                        if (dbUser.getPassword().equals(user.getPassword())) {
                            user.setUserCode(id);
                            userService.updateUser(user);
                            return new ResponseEntity<>("Update Success", HttpStatus.OK);
                        } else {
                            return new ResponseEntity<>("Incorrect Password", HttpStatus.FORBIDDEN);
                        }
                    } else {
                        return new ResponseEntity<>("Email Already Exist", HttpStatus.CONFLICT);
                    }
                } else {
                    return new ResponseEntity<>("Phone Already Exist", HttpStatus.CONFLICT);
                }
            }
            return new ResponseEntity<>("User Not Found", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/user/filter")
    public ResponseEntity<?> filterUser(@RequestParam Map<String, Object> params) {
        return new ResponseEntity<>(userService.filterUser(params), HttpStatus.OK);
    }

    @PutMapping("/user/change-password")
    public ResponseEntity<?> changeUserPassword(@RequestParam String id,
                                                String oldPassword,
                                                String newPassword,
                                                String newPassword2) {
        if (userService.isExist(id)) {
            boolean cekPassword = userService.findById(id).getPassword().equals(oldPassword);
            if (cekPassword) {
                if (newPassword.equals(newPassword2)) {
                    int changePassword = userService.changePassword(id, newPassword);
                    if (changePassword == 1) {
                        return new ResponseEntity<>("Success Change Password", HttpStatus.OK);
                    } else {
                        return new ResponseEntity<>("password has not changed", HttpStatus.OK);
                    }

                } else {
                    return new ResponseEntity<>("new Password verification did not match", HttpStatus.BAD_REQUEST);
                }
            } else {
                return new ResponseEntity<>("Incorrect Password", HttpStatus.FORBIDDEN);
            }
        }
        return new ResponseEntity<>("Account Not Found", HttpStatus.NOT_FOUND);
    }
    @DeleteMapping("/user/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") String id){
        return new ResponseEntity<>(userService.delete(id)+" User Successfully Deleted", HttpStatus.OK);
    }
}
