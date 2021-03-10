package com.nextsoft.gromart.service;

import com.nextsoft.gromart.model.Product;

import java.util.List;

public interface ProductService {
    Product findById(String id);
    List<Product> findBySeller(String id);
    Product findAllProduct();
}
