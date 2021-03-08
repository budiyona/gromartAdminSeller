package com.nextsoft.gromart.service;

import com.nextsoft.gromart.model.User;

public interface UserService {
    User findById(String id);
    boolean isEmailExist(String email);
    boolean isExist(String id);
    boolean isPhoneExist(String phone);
    User login(String email);
    User save(User user);
}
