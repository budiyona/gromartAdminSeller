package com.nextsoft.gromart.service;

import com.nextsoft.gromart.model.Product;

import java.util.List;
import java.util.Map;

public interface ProductService {
    Product findById(String id);
    List<Product> findBySeller(String id);
    List<Product> findAllProduct();
    List<Product> getCheapestProduct();
    List<Product> getMostExpensiveProduct();
    int countProduct(Map<String, String> params);

}
