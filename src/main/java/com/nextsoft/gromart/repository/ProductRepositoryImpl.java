package com.nextsoft.gromart.repository;

import com.nextsoft.gromart.model.Product;
import com.nextsoft.gromart.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository("ProductRepository")
public class ProductRepositoryImpl implements ProductRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public Product findById(String id) {
        return null;
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
                        new User(
                                rs.getString("userCode"),
                                rs.getString("userName")
                        )
                ), id);
    }

    @Override
    public List<Product> findAllProduct() {
        return jdbcTemplate.query(
                "select * from product p join user u on p.userCode = u.userCode ",
                (rs, i) -> new Product(
                        rs.getString("productCode"),
                        rs.getString("productName"),
                        rs.getDouble("price"),
                        rs.getInt("stock"),
                        rs.getString("description"),
                        new User(
                                rs.getString("userCode"),
                                rs.getString("userName")
                        )
                )
        );
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
    public int countProduct(String status) {
        return jdbcTemplate.queryForObject(
                "select count(*) from product where status = ?",
                Integer.class, status);
    }
}
