package com.nextsoft.gromart.service;

import com.nextsoft.gromart.model.Product;
import com.nextsoft.gromart.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("ProductService")
public class ProductServiceImpl implements ProductService{
    @Autowired
    ProductRepository productRepository;

    @Override
    public Product findById(String id) {
        return productRepository.findById(id);
    }

    @Override
    public List<Product> findBySeller(String id) {
        return productRepository.findBySeller(id);
    }

    @Override
    public  List<Product> findAllProduct() {
        return productRepository.findAllProduct();
    }

    @Override
    public List<Product> getCheapestProduct() {
        return productRepository.getCheapestProduct();
    }

    @Override
    public List<Product> getMostExpensiveProduct() {
        return productRepository.getMostExpensiveProduct();
    }

    @Override
    public int countProduct(String status) {
        return productRepository.countProduct(status);
    }
}
