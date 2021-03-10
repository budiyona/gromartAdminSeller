package com.nextsoft.gromart.repository;

import com.nextsoft.gromart.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("ProductRepository")
public class ProductRepositoryImpl implements ProductRepository{
    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public Product findById(String id) {
        return null;
    }

    @Override
    public List<Product> findBySeller(String id) {
        return null;
    }

    @Override
    public Product findAllProduct() {
        return null;
    }
}
