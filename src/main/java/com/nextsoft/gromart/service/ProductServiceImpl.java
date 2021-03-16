package com.nextsoft.gromart.service;

import com.nextsoft.gromart.model.Product;
import com.nextsoft.gromart.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("ProductService")
public class ProductServiceImpl implements ProductService {
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
    public Map<String , Object> findAllProduct(String offset) {
        return productRepository.findAllProduct(offset);
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
    public Map<String, Object> filterProduct(Map<String, String> params) {
        Map<String, Object> map = new HashMap<>();
        String condition = "";
        String limit = " limit 6 offset ";
        if (params.containsKey("offset")) {
            limit += params.get("offset");
        } else {
            limit = "";
        }

        if (params.containsKey("status") &&
                params.containsKey("productCode") &&
                params.containsKey("productName") &&
                params.containsKey("fromDate") &&
                params.containsKey("toDate")) {
            condition = "where p.status = '"
                    + params.get("status")
                    + "' and (date(p.createdDate) between '"
                    + params.get("fromDate")
                    + "' and '"
                    + params.get("toDate")
                    + "') and ( productCode like '%"
                    + params.get("productCode")
                    + "%' or productName like '%"
                    + params.get("productName")
                    + "%' )";


        } else if (params.containsKey("status") &&
                params.containsKey("productCode") &&
                params.containsKey("productName")) {
            condition = "where p.status = '"
                    + params.get("status")
                    + "' and ( productCode like '%"
                    + params.get("productCode")
                    + "%' or productName like '%"
                    + params.get("productName")
                    + "%' )";

        } else if (params.containsKey("status") &&
                params.containsKey("productCode") &&
                params.containsKey("fromDate") &&
                params.containsKey("toDate")) {
            condition = "where p.status = '"
                    + params.get("status")
                    + "' and (date(p.createdDate) between '"
                    + params.get("fromDate")
                    + "' and '"
                    + params.get("toDate")
                    + "') and productCode like '%"
                    + params.get("productCode")
                    + "%'";

        } else if (params.containsKey("status") &&
                params.containsKey("productName") &&
                params.containsKey("fromDate") &&
                params.containsKey("toDate")) {
            condition = "where p.status = '"
                    + params.get("status")
                    + "' and (date(p.createdDate) between '"
                    + params.get("fromDate")
                    + "' and '"
                    + params.get("toDate")
                    + "') and ( productName like '%"
                    + params.get("productName")
                    + "%' )";

        } else if (params.containsKey("productCode") &&
                params.containsKey("productName") &&
                params.containsKey("fromDate") &&
                params.containsKey("toDate")) {
            condition = "where (date(p.createdDate) between '"
                    + params.get("fromDate")
                    + "' and '"
                    + params.get("toDate")
                    + "') and ( productCode like '%"
                    + params.get("productCode")
                    + "%' or productName like '%"
                    + params.get("productName")
                    + "%' )";

        } else if (params.containsKey("status") &&
                params.containsKey("productName")) {
            condition = "where p.status = '"
                    + params.get("status")
                    + "' and productName like '%"
                    + params.get("productName")
                    + "%' ";

        } else if (params.containsKey("status") &&
                params.containsKey("productCode")) {
            condition = "where p.status = '"
                    + params.get("status")
                    + "' and productCode like '%"
                    + params.get("productCode")
                    + "%' ";
        } else if (params.containsKey("status") &&
                params.containsKey("fromDate") &&
                params.containsKey("toDate")) {
            condition = "where p.status = '"
                    + params.get("status")
                    + "' and (date(p.createdDate) between '"
                    + params.get("fromDate")
                    + "' and '"
                    + params.get("toDate")
                    + "')";
        } else if (params.containsKey("productCode") &&
                params.containsKey("productName")) {
            condition = "where productCode like '%"
                    + params.get("productName")
                    + "%' and productName like '%"
                    + params.get("productCode")
                    + "%' ";

        } else if (params.containsKey("productName") &&
                params.containsKey("fromDate") &&
                params.containsKey("toDate")) {
            condition = "where (date(p.createdDate) between '"
                    + params.get("fromDate")
                    + "' and '"
                    + params.get("toDate")
                    + "') and productName like '%"
                    + params.get("productName")
                    + "%' ";

        } else if (params.containsKey("productCode") &&
                params.containsKey("fromDate") &&
                params.containsKey("toDate")) {
            condition = "where (date(p.createdDate) between '"
                    + params.get("fromDate")
                    + "' and '"
                    + params.get("toDate")
                    + "') and productCode like '%"
                    + params.get("productCode")
                    + "%' ";

        } else if (params.containsKey("status")) {
            condition = "where p.status = '"
                    + params.get("status")
                    + "' ";
        } else if (params.containsKey("productCode")) {
            condition = "where productCode like '%"
                    + params.get("productCode")
                    + "%' ";

        } else if (params.containsKey("productName")) {
            condition = "where productName like '%"
                    + params.get("productName")
                    + "%' ";

        } else if (params.containsKey("fromDate") &&
                params.containsKey("toDate")) {
            condition = "where (date(p.createdDate) between '"
                    + params.get("fromDate")
                    + "' and '"
                    + params.get("toDate")
                    + "')";
        } else {
            map.put("qty", -1);
            map.put("product", null);
            return map;
        }
//        condition+=limit;
        return productRepository.filterProduct(condition, condition + limit);
    }

    @Override
    public int countProductByStatus(String status) {
        return productRepository.countProductByStatus(status);
    }
}
