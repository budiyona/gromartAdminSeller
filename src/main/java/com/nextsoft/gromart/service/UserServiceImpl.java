package com.nextsoft.gromart.service;

import com.nextsoft.gromart.model.User;
import com.nextsoft.gromart.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("UserService")
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public User findById(String id) {
        return userRepository.findById(id);
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public boolean isPhoneExist(String phone) {
        return userRepository.isPhoneExist(phone);
    }

    @Override
    public boolean isEmailExist(String email) {
        return userRepository.isEmailExist(email);
    }

    @Override
    public User login(String email) {
        return userRepository.login(email);
    }

    @Override
    public boolean isExist(String id) {
        return userRepository.isExist(id);
    }

    @Override
    public int countSeller(String condition) {
        return userRepository.countSeller(condition);
    }

    @Override
    public List<User> getSeller(int offset) {
        return userRepository.getSeller(offset);
    }

    @Override
    public int updateStatus(String id, String status, String idAdmin) {
        return userRepository.updateStatus(id, status, idAdmin);
    }

    @Override
    public int updateProductQty(String id, int qty, String idAdmin) {
        return userRepository.updateProductQty(id, qty, idAdmin);
    }

    @Override
    public int updateUser(User user) {
        return 0;
    }

    @Override
    public boolean isUserActive(String email) {
        return userRepository.isUserActive(email);
    }
}
