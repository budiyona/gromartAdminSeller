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
    public Map<String, Object> filterUser(Map<String, Object> paramsFilter) {

        //status, userName, userCode
        Map<String, Object> map = new HashMap<>();
        String condition = "";
        String limit = " limit 6 offset ";
        String sort = " order by field(status, 'requested','active','inactive' )";
        if (paramsFilter.containsKey("offset")) {
            limit += paramsFilter.get("offset");
        } else {
            limit = "";
        }

        if (paramsFilter.containsKey("status")) {
            switch ((String) paramsFilter.get("status")) {
                case "active":
                case "inactive":
                    condition = " where status='" + paramsFilter.get("status") + "'";
                    break;
                default:
                    break;
            }
        }

        if (paramsFilter.containsKey("userName")) {
            condition ="where userName like '%" + paramsFilter.get("userName") + "%'";
        }
        if (paramsFilter.containsKey("userCode")) {
            condition ="where userCode like '%" + paramsFilter.get("userCode") + "%'";

        }
        if (paramsFilter.containsKey("fromDate") && paramsFilter.containsKey("toDate")) {
            condition ="where  date(createdDate) between '" + paramsFilter.get("fromDate") + "'" +
                    " and '" + paramsFilter.get("toDate") + "'";

        }
        System.out.println(condition);
        return userRepository.filterUser(condition, condition +sort+ limit);
    }

    @Override
    public int changePassword(String id, String newPassword) {
        return userRepository.changePassword(id, newPassword);
    }

    @Override
    public int delete(String id) {
        return userRepository.delete(id);
    }
}
