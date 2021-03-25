package com.nextsoft.gromart.controller;

import com.nextsoft.gromart.model.Product;
import com.nextsoft.gromart.model.User;
import com.nextsoft.gromart.service.ProductService;
import com.nextsoft.gromart.service.UserService;
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

    @Autowired
    UserService userService;

    @GetMapping("/product")
    public ResponseEntity<?> getAll(@RequestParam String offset) {
        return new ResponseEntity<>(productService.findAllProduct(offset), HttpStatus.OK);
    }

    @GetMapping("/product/cheapest")
    public ResponseEntity<List<Product>> getCheapestProduct() {
        return new ResponseEntity<>(productService.getCheapestProduct(), HttpStatus.OK);
    }

    @GetMapping("/product/most-expensive")
    public ResponseEntity<List<Product>> getMostExpensiveProduct() {
        return new ResponseEntity<>(productService.getMostExpensiveProduct(), HttpStatus.OK);
    }

    @GetMapping("/product/filter")
    public ResponseEntity<?> getNumberOfProduct(@RequestParam Map<String, String> params) {
        Map<String, Object> map = productService.filterProduct(params);
//        int qty= (int) map.get("qty");

        if ((int) map.get("qty") >= 0) {
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
        return new ResponseEntity<>("bad request", HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/product/count-by-status")
    public ResponseEntity<?> getNumberOfProductByStatus(@RequestParam String status) {
        switch (status) {
            case "active":
            case "inactive":
                return new ResponseEntity<>(
                        productService.countProductByStatus(" where status = '" + status + "'"),
                        HttpStatus.OK);

            case "all":
                return new ResponseEntity<>(
                        productService.countProductByStatus(""),
                        HttpStatus.OK);
            default:
                return new ResponseEntity<>("request not found",
                        HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/product/seller/most-expensive/{id}")
    public ResponseEntity<?> getExpensiveProductOfSeller(@PathVariable String id) {
        return new ResponseEntity<>(productService.getProductOfSeller(id, "expensive"), HttpStatus.OK);
    }

    @GetMapping("/product/seller/cheapest/{id}")
    public ResponseEntity<?> getCheapestProductOfSeller(@PathVariable String id) {
        return new ResponseEntity<>(productService.getProductOfSeller(id, "cheapest"), HttpStatus.OK);
    }

    //find product by seller id
    @GetMapping("/product/seller")
    public ResponseEntity<?> getProductBySeller(@RequestParam String id, String offset) {
        return new ResponseEntity<>(productService.findBySeller(id, offset), HttpStatus.OK);
    }

    //filter product on specific Seller
    @GetMapping("/product/seller/filter/{id}")
    public ResponseEntity<?> filterProductBasedOnSeller(@PathVariable String id, @RequestParam Map<String, String> paramsFilter) {
        return new ResponseEntity<>(productService.filterProductOnSeller(id, paramsFilter), HttpStatus.OK);
    }

    //test api status
    @GetMapping("/test")
    public ResponseEntity<?> testConnection() {
        return new ResponseEntity<>(productService.findById("hello"), HttpStatus.OK);
    }

    @GetMapping("/product/seller-summary")
    public ResponseEntity<?> getSellerSummary(@RequestParam String id) {
        if (userService.isExist(id)) {
            return new ResponseEntity<>(productService.getSellerSummary(id), HttpStatus.OK);

        }
        return new ResponseEntity<>("NOT FOUND", HttpStatus.NOT_FOUND);
    }

    @PostMapping("/product")
    public ResponseEntity<?> createProduct(@RequestParam String id, @RequestBody Product product) {
        if (!productService.isProductNameExist(id, product.getProductName())) {
            Map<String, Integer> map = productService.getSellerSummary(id);
            int active = map.get("active");
            int limit = map.get("limit");
            if (product.getStatus().equals("active")) {
                if (active + 1 <= limit) {
                    return new ResponseEntity<>(
                            productService.createProduct(product, id)
                                    + " Product Successfully Added", HttpStatus.OK);
                }
                return new ResponseEntity<>(
                        "your active product has reached the limit ", HttpStatus.BAD_REQUEST);
            } else {
                return new ResponseEntity<>(
                        productService.createProduct(product, id)
                                + " Product Successfully Added", HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(" Product Name Already Exist", HttpStatus.CONFLICT);
    }

    @PutMapping("/product")
    public ResponseEntity<?> updateProduct(@RequestParam String id, @RequestBody Product product) {
        if (productService.isProductExist(product.getProductCode())) {
            Product target = productService.findById(product.getProductCode());
            Map<String, Integer> map = productService.getSellerSummary(id);
            int active = map.get("active");
            int limit = map.get("limit");
            if (!productService.isProductNameExist(id, product.getProductName()) ||
                    target.getProductName().equals(product.getProductName())) {
                if (product.getStatus().equals("active")) {
                    if (active + 1 <= limit) {
                        return new ResponseEntity<>(
                                productService.updateProduct(product)
                                        + " Product Successfully Updated", HttpStatus.OK);
                    }
                    return new ResponseEntity<>(
                            "product active must be less than " + limit, HttpStatus.BAD_REQUEST);
                }
                return new ResponseEntity<>(
                        productService.updateProduct(product)
                                + " Product Successfully Updated", HttpStatus.OK);
            }
            return new ResponseEntity<>(" Product Name Already Exist", HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>(" Product Does not Exist", HttpStatus.NOT_FOUND);
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<?> findProductById(@PathVariable String id) {
        if (productService.isProductExist(id)) {
            return new ResponseEntity<>(productService.findById(id), HttpStatus.OK);
        }
        return new ResponseEntity<>(" Product Does not Exist", HttpStatus.NOT_FOUND);
    }

    @GetMapping("/product/report/{id}")
    public ResponseEntity<?> reportProductSeller(@PathVariable String id, @RequestParam Map<String, String> paramsFilter) {
        return new ResponseEntity<>(productService.productReport(id, paramsFilter), HttpStatus.OK);
    }

    @DeleteMapping("/product/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable String id) {
        return new ResponseEntity<>(productService.deleteProduct(id) + " product Successfully deleted", HttpStatus.OK);
    }

}
