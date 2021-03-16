package com.nextsoft.gromart.repository;

import com.nextsoft.gromart.model.Product;

import java.util.List;
import java.util.Map;

public interface ProductRepository {
    Product findById(String id);
    List<Product> findBySeller(String id);
    Map<String , Object> findAllProduct(String offset);
    List<Product> getCheapestProduct();
    List<Product> getMostExpensiveProduct();
    Map<String, Object> filterProduct(String conditionQty, String conditionObject);
    int countProductByStatus(String status);
}
