package com.nextsoft.gromart.repository;

import com.nextsoft.gromart.model.Product;

import java.util.List;
import java.util.Map;

public interface ProductRepository {
    Product findById(String id);
    Map<String , Object> findBySeller(String id, String offset);
    Map<String , Object> findAllProduct(String offset);
    List<Product> getCheapestProduct();
    List<Product> getMostExpensiveProduct();
    Map<String, Object> filterProduct(String conditionQty, String conditionObject);
    int countProductByStatus(String status);
    Map<String, Integer> getSellerSummary(String id);

    Map<String, Object> filterProductOnSeller(String id, String target, int offset);
    int createProduct(Product product, String idSeller);
    boolean isProductNameExist(String idSeller, String productName);
    boolean isProductExist(String productId);
    int updateProduct(Product product);
}
