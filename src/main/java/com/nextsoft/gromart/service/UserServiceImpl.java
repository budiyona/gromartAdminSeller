package com.nextsoft.gromart.service;

import com.nextsoft.gromart.model.User;
import com.nextsoft.gromart.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public int updateProductQty(String id, int limitProduct, String idAdmin) {
        return userRepository.updateProductQty(id, limitProduct, idAdmin);
    }

    @Override
    public int updateUser(User user) {
        return userRepository.updateUser(user);
    }

    @Override
    public boolean isUserActive(String email) {
        return userRepository.isUserActive(email);
    }

    @Override
    public Map<String, Object> filterUser(Map<String, Object> params) {
        Map<String, Object> map = new HashMap<>();
        String condition = "";
        String limit = " limit 6 offset ";
        ArrayList<String> arrayCondition = new ArrayList<>();
        if (params.containsKey("offset")) {
            limit += params.get("offset");
        } else {
            limit = "";
        }

        if (params.containsKey("status")) {
            switch ((String) params.get("status")){
                case "active":
                case "inactive":
                    arrayCondition.add("status='" + params.get("status")+"'");
                    break;
                default:
                    break;
            }
        }

        if (params.containsKey("field")) {
            if (params.get("field").equals("userName")) {
                arrayCondition.add("userName like '%" + params.get("target")+"%'");
            } else {
                arrayCondition.add("userCode like '%" + params.get("target")+"%'");
            }
        }

        condition= String.join(" and ",arrayCondition);
//        System.out.println(condition);
//        System.out.println(params.get("field").equals("userName"));
        return userRepository.filterUser(condition, condition + limit);
    }

    @Override
    public int changePassword(String id, String newPassword) {
        return userRepository.changePassword(id, newPassword);
    }
}
