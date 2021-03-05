package com.nextsoft.gromart.service;

import com.nextsoft.gromart.model.User;

public interface UserService {
    User findByEmail(String email);
    boolean isEmailExist(String email);
    User login(String email);
}
