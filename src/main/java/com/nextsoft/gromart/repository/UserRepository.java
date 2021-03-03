package com.nextsoft.gromart.repository;

import com.nextsoft.gromart.model.User;

public interface UserRepository {
    User finByEmail(String email);
    boolean isEmailExist(String email);
}
