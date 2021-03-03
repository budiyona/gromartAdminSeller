package com.nextsoft.gromart.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class Product {
    private String productCode;
    private String productName;
    private double price;
    private int stock;
    private String description;
    private String createdBy;
    private Date createdDate;
    private String updateBy;
    private Date updateDate;

    public Product(String productCode,
                   String productName,
                   double price,
                   int stock,
                   String description,
                   String createdBy,
                   Date createdDate,
                   String updateBy,
                   Date updateDate) {
        this.productCode = productCode;
        this.productName = productName;
        this.price = price;
        this.stock = stock;
        this.description = description;
        this.createdBy = createdBy;
        this.createdDate = createdDate;
        this.updateBy = updateBy;
        this.updateDate = updateDate;
    }
}
