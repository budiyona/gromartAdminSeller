package com.nextsoft.gromart.repository;

import com.nextsoft.gromart.model.User;

public interface UserRepository {
//    User finByEmail(String email);
    boolean isEmailExist(String email);
    boolean isPhoneExist(String phone);
    User login(String email);
    boolean isExist(String id);
    User findById(String id);
    User save(User user);
    String genId();
}
