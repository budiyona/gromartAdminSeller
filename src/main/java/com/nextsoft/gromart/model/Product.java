package com.nextsoft.gromart.model;

import lombok.*;

import java.util.Date;

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
    private String userCode;
}
