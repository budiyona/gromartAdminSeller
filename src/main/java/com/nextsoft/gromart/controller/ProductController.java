package com.nextsoft.gromart.controller;

import com.nextsoft.gromart.model.Product;
import com.nextsoft.gromart.model.User;
import com.nextsoft.gromart.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<List<Product>> getCheapestProduct(){
        return new ResponseEntity<>(productService.getCheapestProduct(), HttpStatus.OK);
    }
    @GetMapping("/product/most-expensive")
    public ResponseEntity<List<Product>> getMostExpensiveProduct(){
        return new ResponseEntity<>(productService.getMostExpensiveProduct(), HttpStatus.OK);
    }
    @GetMapping("/product/count-product")
    public ResponseEntity<?> getNumberOfSeller(@RequestParam String status) {
        return new ResponseEntity<>(productService.countProduct(status), HttpStatus.OK);
    }
}
