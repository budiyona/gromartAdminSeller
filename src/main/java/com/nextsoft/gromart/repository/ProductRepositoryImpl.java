package com.nextsoft.gromart.repository;

import com.nextsoft.gromart.model.Product;
import com.nextsoft.gromart.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository("ProductRepository")
public class ProductRepositoryImpl implements ProductRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public Product findById(String id) {
        int l = jdbcTemplate.queryForObject(
                "select count(*) as qty from product ", (rs, i) -> rs.getInt("qty"));
        Product p = new Product();
        p.setPrice(l);
        return p;
    }

    @Override
    public List<Product> findBySeller(String id) {
        return jdbcTemplate.query(
                "select * from product p join user u on p.userCode = u.userCode where p.userCode=?",
                (rs, i) -> new Product(
                        rs.getString("productCode"),
                        rs.getString("productName"),
                        rs.getDouble("price"),
                        rs.getInt("stock"),
                        rs.getString("description"),
                        rs.getString("createdDate"),
                        new User(
                                rs.getString("userCode"),
                                rs.getString("userName")
                        )
                ), id);
    }

    @Override
    public Map<String, Object> findAllProduct(String offset) {
        Map<String, Object> map = new HashMap<>();

        map.put("qty", countProductByStatus(" "));

        map.put("product", jdbcTemplate.query(
                "select * from product p join user u on p.userCode = u.userCode limit 6 offset "+offset,
                (rs, i) -> new Product(
                        rs.getString("productCode"),
                        rs.getString("productName"),
                        rs.getDouble("price"),
                        rs.getInt("stock"),
                        rs.getString("description"),
                        rs.getString("createdDate"),
                        new User(
                                rs.getString("userCode"),
                                rs.getString("userName")
                        )
                )
        ));
        return map;
    }

    @Override
    public List<Product> getCheapestProduct() {
        List<Product> products = jdbcTemplate.query(
                "select * from product p join user u on p.userCode = u.userCode order by price asc ",
                (rs, i) -> new Product(
                        rs.getString("productCode"),
                        rs.getString("productName"),
                        rs.getDouble("price"),
                        rs.getInt("stock"),
                        rs.getString("description"),
                        rs.getString("createdDate"),
                        new User(
                                rs.getString("userCode"),
                                rs.getString("userName")
                        )
                ));
        if (products.size() > 3) {
            products = products.subList(0, 3);
        }
        return products;
    }

    @Override
    public List<Product> getMostExpensiveProduct() {
        List<Product> products = jdbcTemplate.query(
                "select * from product p join user u on p.userCode = u.userCode order by price desc ",
                (rs, i) -> new Product(
                        rs.getString("productCode"),
                        rs.getString("productName"),
                        rs.getDouble("price"),
                        rs.getInt("stock"),
                        rs.getString("description"),
                        rs.getString("createdDate"),
                        new User(
                                rs.getString("userCode"),
                                rs.getString("userName")
                        )
                ));
        if (products.size() > 3) {
            products = products.subList(0, 3);
        }
        return products;
    }

    @Override
    public Map<String, Object> filterProduct(String conditionQty, String conditionObject) {
        Map<String, Object> map = new HashMap<>();
        try {

            map.put("qty",
                    jdbcTemplate.queryForObject(
                            "select count(*) from product p " + conditionQty,
                            Integer.class)
            );
        } catch (Exception e) {
            e.printStackTrace();
        }
        map.put("product", jdbcTemplate.query(
                "select * from product p join user u on p.userCode = u.userCode " + conditionObject,
                (rs, i) -> new Product(
                        rs.getString("productCode"),
                        rs.getString("productName"),
                        rs.getDouble("price"),
                        rs.getInt("stock"),
                        rs.getString("description"),
                        rs.getString("createdDate"),
                        new User(
                                rs.getString("userCode"),
                                rs.getString("userName")
                        )
                )
        ));
        return map;
    }

    @Override
    public int countProductByStatus(String status) {
        return jdbcTemplate.queryForObject(
                "select count(*) from product " + status,
                Integer.class);
    }
}
