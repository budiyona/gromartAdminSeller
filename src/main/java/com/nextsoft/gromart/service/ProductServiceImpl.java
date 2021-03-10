package com.nextsoft.gromart.service;

import com.nextsoft.gromart.model.Product;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("ProductService")
public class ProductServiceImpl implements ProductService{
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
