package com.nextsoft.gromart.model;

import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@ToString
@AllArgsConstructor
public class Product {
    private String productCode;
    private String productName;
    private double price;
    private int stock;
    private String description;
    private String createdDate;
    private String status;
    private User seller;

    public Product(String productCode,
                   String productName,
                   double price,
                   int stock,
                   String description,
                   String createdDate) {
        this.productCode = productCode;
        this.productName = productName;
        this.price = price;
        this.stock = stock;
        this.description = description;
        this.createdDate = createdDate;
    }
}
