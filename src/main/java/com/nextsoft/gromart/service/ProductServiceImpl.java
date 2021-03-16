package com.nextsoft.gromart.service;

import com.nextsoft.gromart.model.Product;
import com.nextsoft.gromart.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public List<Product> findAllProduct() {
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
    public int countProduct(Map<String, String> params) {
        String filter = "";
        if (params.containsKey("status") &&
                params.containsKey("productCode") &&
                params.containsKey("productName") &&
                params.containsKey("fromDate") &&
                params.containsKey("toDate")) {
            filter = "where status = '"
                    + params.get("status")
                    + "' and (date(createdDate) between '"
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
            filter = "where status = '"
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
            filter = "where status = '"
                    + params.get("status")
                    + "' and (date(createdDate) between '"
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
            filter = "where status = '"
                    + params.get("status")
                    + "' and (date(createdDate) between '"
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
            filter = "where (date(createdDate) between '"
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
            filter = "where status = '"
                    + params.get("status")
                    + "' and productName like '%"
                    + params.get("productName")
                    + "%' ";

        } else if (params.containsKey("status") &&
                params.containsKey("productCode")) {
            filter = "where status = '"
                    + params.get("status")
                    + "' and productCode like '%"
                    + params.get("productCode")
                    + "%' ";
        } else if (params.containsKey("status") &&
                params.containsKey("fromDate") &&
                params.containsKey("toDate")) {
            filter = "where status = '"
                    + params.get("status")
                    + "' and (date(createdDate) between '"
                    + params.get("fromDate")
                    + "' and '"
                    + params.get("toDate")
                    + "')";
        } else if (params.containsKey("productCode") &&
                params.containsKey("productName")) {
            filter = "where productCode like '%"
                    + params.get("productName")
                    + "%' and productName like '%"
                    + params.get("productCode")
                    + "%' ";

        } else if (params.containsKey("productName") &&
                params.containsKey("fromDate") &&
                params.containsKey("toDate")) {
            filter = "where (date(createdDate) between '"
                    + params.get("fromDate")
                    + "' and '"
                    + params.get("toDate")
                    + "') and productName like '%"
                    + params.get("productName")
                    + "%' ";

        } else if (params.containsKey("productCode") &&
                params.containsKey("fromDate") &&
                params.containsKey("toDate")) {
            filter = "where (date(createdDate) between '"
                    + params.get("fromDate")
                    + "' and '"
                    + params.get("toDate")
                    + "') and productCode like '%"
                    + params.get("productCode")
                    + "%' ";

        } else if (params.containsKey("status")) {
            filter = "where status = '"
                    + params.get("status")
                    + "' ";
        } else if (params.containsKey("productCode")) {
            filter = "where productCode like '%"
                    + params.get("productCode")
                    + "%' ";

        } else if (params.containsKey("productName")) {
            filter = "where productName like '%"
                    + params.get("productName")
                    + "%' ";

        } else if (params.containsKey("fromDate") &&
                params.containsKey("toDate")) {
            filter = "where (date(createdDate) between '"
                    + params.get("fromDate")
                    + "' and '"
                    + params.get("toDate")
                    + "')";
        } else {
            return -1;
        }
        return productRepository.countProduct(filter);
    }
}
