package com.nextsoft.gromart.service;

import com.nextsoft.gromart.model.Product;

import java.util.List;
import java.util.Map;

public interface ProductService {
    Product findById(String id);
    Map<String , Object> findBySeller(String id, String offset);
    Map<String , Object> findAllProduct(String offset);
    List<Product> getCheapestProduct();
    List<Product> getMostExpensiveProduct();
    Map<String , Object> filterProduct(Map<String, String> params);
    int countProductByStatus(String status);
    Map<String, Integer> getSellerSummary(String id);
    Map<String, Object> filterProductOnSeller(String id, Map<String, String> params);

    int createProduct(Product product, String idSeller);
    boolean isProductNameExist(String idSeller, String productName);
    boolean isProductExist(String productId);
    int updateProduct(Product product);
    Map<String, Object> productReport(String id, Map<String,String> paramsFilter);
    int deleteProduct(String id);
}
