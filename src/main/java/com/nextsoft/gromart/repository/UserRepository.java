package com.nextsoft.gromart.repository;

import com.nextsoft.gromart.model.User;

import java.util.List;

public interface UserRepository {
//    User finByEmail(String email);
    boolean isEmailExist(String email);
    boolean isPhoneExist(String phone);
    User login(String email);
    boolean isExist(String id);
    User findById(String id);
    User save(User user);
    String genId();
    int countSeller(String condition);
    List<User> getSeller(int offset);
    int updateStatus(String id,String status, String idAdmin);
    int updateProductQty(String id, int qty, String idAdmin);
}
