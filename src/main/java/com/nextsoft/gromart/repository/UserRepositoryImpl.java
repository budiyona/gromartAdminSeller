package com.nextsoft.gromart.repository;

import com.nextsoft.gromart.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository("UserRepository")
public class UserRepositoryImpl implements UserRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public User finByEmail(String email) {
        String query="select * from user where email = ?";
        try {
            User target = jdbcTemplate.queryForObject(query,(resultSet, i) ->
                    new User(
                            resultSet.getString("userCode"),
                            resultSet.getString("userName"),
                            resultSet.getString("phone"),
                            resultSet.getString("email"),
                            resultSet.getString("password"),
                            resultSet.getString("status"),
                            resultSet.getString("createdBy"),
                            resultSet.getString("createdDate"),
                            resultSet.getString("updateBy"),
                            resultSet.getString("updateDate")
                    ),
                    email);
            return target;

        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public boolean isEmailExist(String email) {
        if(finByEmail(email)!=null){
            return true;
        }
        return false;
    }
}
