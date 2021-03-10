package com.nextsoft.gromart.repository;

import com.nextsoft.gromart.model.Product;

import java.util.List;

public interface ProductRepository {
    Product findById(String id);
    List<Product> findBySeller(String id);
    Product findAllProduct();
}
