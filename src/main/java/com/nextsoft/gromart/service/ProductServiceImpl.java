package com.nextsoft.gromart.service;

import com.nextsoft.gromart.model.Product;
import com.nextsoft.gromart.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
    public Map<String, Object> findBySeller(String id, String offset) {
        return productRepository.findBySeller(id, offset);
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
    public Map<String, Object> filterProduct(Map<String, String> paramsFilter) {
        Map<String, Object> map = new HashMap<>();
        String condition = "where p.status != 'disabled' and ";
        String limit = " limit 6 offset ";
        if (paramsFilter.containsKey("offset")) {
            limit += paramsFilter.get("offset");
        } else {
            limit = "";
        }

        if (paramsFilter.containsKey("status")) {
            switch ((String) paramsFilter.get("status")) {
                case "active":
                case "inactive":
                    condition += "p.status='" + paramsFilter.get("status") + "'";
                    break;
                default:
                    break;
            }
        }

        if (paramsFilter.containsKey("productName")) {
            condition += " productName like '%" + paramsFilter.get("productName") + "%'";
        }
        if (paramsFilter.containsKey("productCode")) {
            condition += " productCode like '%" + paramsFilter.get("productCode") + "%'";

        }
        if (paramsFilter.containsKey("fromDate") && paramsFilter.containsKey("toDate")) {
            condition += " date(p.createdDate) between '" + paramsFilter.get("fromDate") + "'" +
                    " and '" + paramsFilter.get("toDate") + "'";

        }

        System.out.println(condition);
        return productRepository.filterProduct(condition, condition + limit);
    }

    @Override
    public int countProductByStatus(String status) {
        System.out.println(status);
        String targetStatus = "";
        switch (status) {
            case "active":
            case "inactive":
                targetStatus = status;
        }
        return productRepository.countProductByStatus(targetStatus);
    }

    @Override
    public Map<String, Integer> getSellerSummary(String id) {
        return productRepository.getSellerSummary(id);
    }

    @Override
    public Map<String, Object> filterProductOnSeller(String id, Map<String, String> paramsFilter) {
        //status, productName, productCode, fromDate, toDate, offset
        Map<String, Object> map = new HashMap<>();
        String condition = "where p.status != 'disabled' and p.userCode = '" + id + "'";
        String limit = " limit 6 offset ";
        ArrayList<String> arrayCondition = new ArrayList<>();
        if (paramsFilter.containsKey("offset")) {
            limit += paramsFilter.get("offset");
        } else {
            limit = "";
        }

        if (paramsFilter.containsKey("status")) {
            switch ((String) paramsFilter.get("status")) {
                case "active":
                case "inactive":
                    arrayCondition.add("p.status='" + paramsFilter.get("status") + "'");
                    break;
                default:
                    break;
            }
        }

        if (paramsFilter.containsKey("productName")) {
            arrayCondition.add("productName like '%" + paramsFilter.get("productName") + "%'");
        }
        if (paramsFilter.containsKey("productCode")) {
            arrayCondition.add("productCode like '%" + paramsFilter.get("productCode") + "%'");

        }
        if (paramsFilter.containsKey("fromDate") && paramsFilter.containsKey("toDate")) {
            arrayCondition.add("date(p.createdDate) between '" + paramsFilter.get("fromDate") + "'" +
                    " and '" + paramsFilter.get("toDate") + "'");

        }
        if (arrayCondition.size() >= 1) {
            condition += " and  " + String.join(" and ", arrayCondition);

        } else {
            condition += String.join(" and ", arrayCondition);
        }
        System.out.println(condition);
//        System.out.println(params.get("field").equals("userName"));
        return productRepository.filterProduct(condition, condition + limit);
    }

    @Override
    public int createProduct(Product product, String idSeller) {
        return productRepository.createProduct(product, idSeller);
    }

    @Override
    public boolean isProductNameExist(String idSeller, String productName) {
        return productRepository.isProductNameExist(idSeller, productName);
    }

    @Override
    public boolean isProductExist(String productId) {
        return productRepository.isProductExist(productId);
    }

    @Override
    public int updateProduct(Product product) {
        return productRepository.updateProduct(product);
    }

    @Override
    public Map<String, Object> productReport(String id, Map<String, String> paramsFilter) {
        //status, productName, productCode, fromDate, toDate, offset
        Map<String, Object> map = new HashMap<>();
        String condition = "where p.status != 'disabled' and p.userCode = '" + id + "'";
        ArrayList<String> arrayCondition = new ArrayList<>();
        if (paramsFilter.containsKey("status")) {
            switch ((String) paramsFilter.get("status")) {
                case "active":
                case "inactive":
                    arrayCondition.add("p.status='" + paramsFilter.get("status") + "'");
                    break;
                default:
                    break;
            }
        }

        if (paramsFilter.containsKey("productName")) {
            arrayCondition.add("productName like '%" + paramsFilter.get("productName") + "%'");
        }
        if (paramsFilter.containsKey("productCode")) {
            arrayCondition.add("productCode like '%" + paramsFilter.get("productCode") + "%'");

        }
        if (paramsFilter.containsKey("fromDate") && paramsFilter.containsKey("toDate")) {
            arrayCondition.add("date(p.createdDate) between '" + paramsFilter.get("fromDate") + "'" +
                    " and '" + paramsFilter.get("toDate") + "'");

        }
        if (arrayCondition.size() >= 1) {
            condition += " and  " + String.join(" and ", arrayCondition);

        } else {
            condition += String.join(" and ", arrayCondition);
        }
        return productRepository.filterProduct(condition, condition);

    }

    @Override
    public int deleteProduct(String id) {
        return productRepository.deleteProduct(id);
    }

    @Override
    public List<Product> getProductOfSeller(String id, String status) {
        String sort = "asc";
        if (status.equals("expensive")) {
            sort = "desc";
        }
        return productRepository.getProductOfSeller(id, sort);
    }
}
