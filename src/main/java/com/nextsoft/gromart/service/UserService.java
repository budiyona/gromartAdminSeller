package com.nextsoft.gromart.service;

import com.nextsoft.gromart.model.User;

import java.util.List;
import java.util.Map;

public interface UserService {
    User findById(String id);
    boolean isEmailExist(String email);
    boolean isExist(String id);
    boolean isPhoneExist(String phone);
    User login(String email);
    User save(User user);
    int countSeller(String condition);
    List<User> getSeller(int offset);
    int updateStatus(String id,String status, String idAdmin);
    int updateProductQty(String id, int limitProduct, String idAdmin);
    int updateUser(User user);
    boolean isUserActive(String email);

    Map<String, Object> filterUser(Map<String, Object> params);
    int changePassword(String id, String newPassword);
}
