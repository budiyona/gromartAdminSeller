package com.nextsoft.gromart.controller;

import com.nextsoft.gromart.model.Product;
import com.nextsoft.gromart.model.User;
import com.nextsoft.gromart.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {
    @Autowired
    ProductService productService;

    @GetMapping("/product")
    public ResponseEntity<List<Product>> getAll() {
        return new ResponseEntity<>(productService.findAllProduct(), HttpStatus.OK);
    }

    @GetMapping("/product/cheapest")
    public ResponseEntity<List<Product>> getCheapestProduct() {
        return new ResponseEntity<>(productService.getCheapestProduct(), HttpStatus.OK);
    }

    @GetMapping("/product/most-expensive")
    public ResponseEntity<List<Product>> getMostExpensiveProduct() {
        return new ResponseEntity<>(productService.getMostExpensiveProduct(), HttpStatus.OK);
    }

    @GetMapping("/product/count-product")
    public ResponseEntity<?> getNumberOfSeller(@RequestParam Map<String, String> params) {
        int qty = productService.countProduct(params);
        if (qty >= 0) {
            return new ResponseEntity<>(qty, HttpStatus.OK);
        }
        return new ResponseEntity<>("bad request", HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/product/seller")
    public ResponseEntity<?> getProductBySeller(@RequestParam String id) {
        return new ResponseEntity<>(productService.findBySeller(id), HttpStatus.OK);
    }

    @GetMapping("/test")
    public ResponseEntity<?> testConnection() {
        return new ResponseEntity<>(productService.findById("hello"), HttpStatus.OK);
    }


}
