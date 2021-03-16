package com.nextsoft.gromart.service;

import com.nextsoft.gromart.model.Product;

import java.util.List;
import java.util.Map;

public interface ProductService {
    Product findById(String id);
    List<Product> findBySeller(String id);
    Map<String , Object> findAllProduct(String offset);
    List<Product> getCheapestProduct();
    List<Product> getMostExpensiveProduct();
    Map<String , Object> filterProduct(Map<String, String> params);
    int countProductByStatus(String status);

}
