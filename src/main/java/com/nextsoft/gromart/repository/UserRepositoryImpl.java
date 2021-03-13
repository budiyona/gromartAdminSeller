package com.nextsoft.gromart.repository;

import com.nextsoft.gromart.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository("UserRepository")
public class UserRepositoryImpl implements UserRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public User findById(String id) {
        String query = "select * from user where userCode = ?";
        try {
            User target = jdbcTemplate.queryForObject(query, (resultSet, i) ->
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
                                    resultSet.getString("updateDate"),
                                    resultSet.getInt("prodQty")
                            ),
                    id);
            return target;

        } catch (Exception e) {
            return null;
        }
    }

//    @Override
//    public User finByEmail(String email) {
//        String query = "select * from user where email = ?";
//        try {
//            User target = jdbcTemplate.queryForObject(query, (resultSet, i) ->
//                            new User(
//                                    resultSet.getString("userCode"),
//                                    resultSet.getString("userName"),
//                                    resultSet.getString("phone"),
//                                    resultSet.getString("email"),
//                                    resultSet.getString("password"),
//                                    resultSet.getString("status"),
//                                    resultSet.getString("createdBy"),
//                                    resultSet.getString("createdDate"),
//                                    resultSet.getString("updateBy"),
//                                    resultSet.getString("updateDate")
//                            ),
//                    email);
//            return target;
//
//        } catch (Exception e) {
//            return null;
//        }
//    }

    @Override
    public boolean isEmailExist(String email) {
        String query = "select count(*) from user where email=?";
        int count = jdbcTemplate.queryForObject(query, Integer.class, email);
        if (count == 1) {
            return true;
        }
        return false;
    }

    @Override
    public boolean isExist(String id) {
        String query = "select count(*) from user where userCode=?";
        int count = jdbcTemplate.queryForObject(query, Integer.class, id);
        if (count == 1) {
            return true;
        }
        return false;
    }

    @Override
    public User save(User user) {
        user.setUserCode(genId());
        user.setStatus("requested");
        String query = "insert into user (" +
                "userCode, userName, phone, email, password, status, createdBy, updateBy)" +
                " values (?,?,?,?,?,?,?,?)";

        jdbcTemplate.update(query,
                user.getUserCode(),
                user.getUserName(),
                user.getPhone(),
                user.getEmail(),
                user.getPassword(),
                user.getStatus(),
                user.getUserCode(),
                user.getUserCode()
        );
        return user;
    }

    @Override
    public boolean isPhoneExist(String phone) {
        String query = "select count(*) from user where phone=?";
        int count = jdbcTemplate.queryForObject(query, Integer.class, phone);
        if (count == 1) {
            return true;
        }
        return false;
    }

    @Override
    public String genId() {
        int count = jdbcTemplate.queryForObject(
                "select count(*) from user where userCode like 'seller%' and " +
                        "date(createdDate)=curdate()", Integer.class);
        String prefix = String.format("%02d", count + 1);
        long millis = System.currentTimeMillis();
        Date date = new Date(millis);
        String id = "SELLER-" + date.toString() + "-" + prefix;
        return id;
    }

    @Override
    public User login(String email) {
        String query = "select * from user where email = ?";
        try {
            User target = jdbcTemplate.queryForObject(query, (resultSet, i) ->
                            new User(
                                    resultSet.getString("userCode"),
                                    resultSet.getString("userName"),
                                    resultSet.getString("status"),
                                    resultSet.getString("password")
                            ),
                    email);
            return target;
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public int countSeller(String condition) {
        return jdbcTemplate.queryForObject(
                "select count(*) from user where userCode like 'seller%' " + condition,
                Integer.class);
    }

    @Override
    public List<User> getSeller(int offset) {
        return jdbcTemplate.query(
                "select * from user where userCode like 'seller%' order by status desc limit 6 offset ?",
                (rs, i) -> new User(
                        rs.getString("userCode"),
                        rs.getString("userName"),
                        rs.getString("phone"),
                        rs.getString("email"),
                        rs.getString("status"),
                        rs.getString("createdBy"),
                        rs.getString("createdDate"),
                        rs.getString("updateBy"),
                        rs.getString("updateDate"),
                        rs.getInt("productLimit")
                ), offset
        );
    }

    @Override
    public int updateStatus(String id, String status, String idAdmin) {
        return jdbcTemplate.update(
                "update user set status = ?, updateBy = ? where userCode = ?",
                status, idAdmin, id
        );
    }

    @Override
    public int updateProductQty(String id, int limitProduct, String idAdmin) {
        return jdbcTemplate.update(
                "update user set prodQty = ?, updateBy = ? where userCode = ?",
                limitProduct, idAdmin, id
        );
    }

    @Override
    public boolean isUserActive(String email) {
        int count = jdbcTemplate.queryForObject(
                "select count(*) from user where email = ? and status = 'active'", Integer.class, email
        );
        if (count == 1) {
            return true;
        }
        return false;
    }
}
