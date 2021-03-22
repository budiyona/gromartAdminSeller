package com.nextsoft.gromart.repository;

import com.nextsoft.gromart.model.Product;
import com.nextsoft.gromart.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Repository("ProductRepository")
public class ProductRepositoryImpl implements ProductRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public Product findById(String id) {
        Product product = new Product();
        try {
            product = jdbcTemplate.queryForObject(
                    "select * from product where productCode = ?",
                    (rs, rowNum) -> new Product(
                            rs.getString("productCode"),
                            rs.getString("productName"),
                            rs.getDouble("price"),
                            rs.getInt("stock"),
                            rs.getString("description"),
                            rs.getString("createdDate"),
                            rs.getString("status")

                    ), id);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        return product;

    }

    @Override
    public Map<String, Object> findBySeller(String id, String offset) {
        Map<String, Object> map = new HashMap<>();

        map.put("qty", jdbcTemplate.queryForObject(
                "select count(*) from product p join user u on p.userCode = u.userCode where p.userCode=?",
                Integer.class, id));
        map.put("product", jdbcTemplate.query(
                "select * from product p join user u on p.userCode = u.userCode where p.userCode=? limit 6 offset " + offset,
                (rs, i) -> new Product(
                        rs.getString("productCode"),
                        rs.getString("productName"),
                        rs.getDouble("price"),
                        rs.getInt("stock"),
                        rs.getString("description"),
                        rs.getString("createdDate"),
                        rs.getString("status"),
                        new User(
                                rs.getString("userCode"),
                                rs.getString("userName")
                        )
                ), id)
        );
        return map;
    }

    @Override
    public Map<String, Object> findAllProduct(String offset) {
        Map<String, Object> map = new HashMap<>();

        map.put("qty", countProductByStatus(" "));

        map.put("product", jdbcTemplate.query(
                "select * from product p join user u on p.userCode = u.userCode limit 6 offset " + offset,
                (rs, i) -> new Product(
                        rs.getString("productCode"),
                        rs.getString("productName"),
                        rs.getDouble("price"),
                        rs.getInt("stock"),
                        rs.getString("description"),
                        rs.getString("createdDate"),
                        rs.getString("status"),
                        new User(
                                rs.getString("userCode"),
                                rs.getString("userName")
                        )
                )
        ));
        return map;
    }

    @Override
    public List<Product> getCheapestProduct() {
        List<Product> products = jdbcTemplate.query(
                "select * from product p join user u on p.userCode = u.userCode order by price asc ",
                (rs, i) -> new Product(
                        rs.getString("productCode"),
                        rs.getString("productName"),
                        rs.getDouble("price"),
                        rs.getInt("stock"),
                        rs.getString("description"),
                        rs.getString("createdDate"),
                        rs.getString("status"),
                        new User(
                                rs.getString("userCode"),
                                rs.getString("userName")
                        )
                ));
        if (products.size() > 3) {
            products = products.subList(0, 3);
        }
        return products;
    }

    @Override
    public List<Product> getMostExpensiveProduct() {
        List<Product> products = jdbcTemplate.query(
                "select * from product p join user u on p.userCode = u.userCode order by price desc ",
                (rs, i) -> new Product(
                        rs.getString("productCode"),
                        rs.getString("productName"),
                        rs.getDouble("price"),
                        rs.getInt("stock"),
                        rs.getString("description"),
                        rs.getString("createdDate"),
                        rs.getString("status"),
                        new User(
                                rs.getString("userCode"),
                                rs.getString("userName")
                        )
                ));
        if (products.size() > 3) {
            products = products.subList(0, 3);
        }
        return products;
    }

    @Override
    public Map<String, Object> filterProduct(String conditionQty, String conditionObject) {
        Map<String, Object> map = new HashMap<>();
        try {

            map.put("qty",
                    jdbcTemplate.queryForObject(
                            "select count(*) from product p " + conditionQty,
                            Integer.class)
            );
        } catch (Exception e) {
            e.printStackTrace();
        }
        map.put("product", jdbcTemplate.query(
                "select * from product p join user u on p.userCode = u.userCode " + conditionObject,
                (rs, i) -> new Product(
                        rs.getString("productCode"),
                        rs.getString("productName"),
                        rs.getDouble("price"),
                        rs.getInt("stock"),
                        rs.getString("description"),
                        rs.getString("createdDate"),
                        rs.getString("status"),
                        new User(
                                rs.getString("userCode"),
                                rs.getString("userName")
                        )
                )
        ));
        return map;
    }

    @Override
    public int countProductByStatus(String status) {
        return jdbcTemplate.queryForObject(
                "select count(*) from product " + status,
                Integer.class);
    }

    @Override
    public Map<String, Integer> getSellerSummary(String id) {
        return jdbcTemplate.queryForObject("select " +
                        "u.productLimit as 'limit', " +
                        "sum(case when p.status = 'active' then 1 else 0 end) as 'active', " +
                        "sum(case when p.status='inactive' then 1 else 0 end) as 'inactive', " +
                        "count(*) as 'all' " +
                        "from product p " +
                        "join user u on p.userCode = u.userCode " +
                        "where p.userCode =?",
                (rs, rowNum) -> Stream.of(new Object[][]{
                        {"active", rs.getInt("active")},
                        {"inactive", rs.getInt("inactive")},
                        {"all", rs.getInt("all")},
                        {"limit", rs.getInt("limit")},
                }).collect(Collectors.toMap(data -> (String) data[0], data -> (Integer) data[1])), id
        );
    }

    @Override
    public Map<String, Object> filterProductOnSeller(String id, String target, int offset) {
        Map<String, Object> map = new HashMap<>();
        try {

            map.put("qty",
                    jdbcTemplate.queryForObject(
                            "select count(*) from product p  where userCode = '" + id +
                                    "' and (productCode like '%" + target + "%' or productName like '%" + target + "%')",
                            Integer.class)
            );
        } catch (Exception e) {
            e.printStackTrace();
        }
        map.put("product", jdbcTemplate.query(
                "select * from product p  where userCode = '" + id +
                        "' and (productCode like '%" + target + "%' or productName like '%" + target + "%') " +
                        "limit 6 offset " + offset,
                (rs, i) -> new Product(
                        rs.getString("productCode"),
                        rs.getString("productName"),
                        rs.getDouble("price"),
                        rs.getInt("stock"),
                        rs.getString("description"),
                        rs.getString("createdDate")
                )
        ));
        return map;
    }

    @Override
    public int createProduct(Product product, String idSeller) {
        //SELLER-2021-03-05-01
        String[] arrStr = idSeller.split("-");
        String sellerCode = "S" + arrStr[1].substring(2) + arrStr[2] + arrStr[3] + arrStr[4] + "-";

        long millis = System.currentTimeMillis();
        Date date = new Date(millis);
        String[] arrStrProductCode = date.toString().split("-");
        arrStrProductCode[0] = arrStrProductCode[0].substring(2);
        String productCode = String.join("", arrStrProductCode);

        try {
            int count = jdbcTemplate.queryForObject(
                    "select count(*) from product p where userCode = ? and date(createdDate) = date(now())",
                    Integer.class,
                    idSeller);
            String prefix = String.format("%02d", count + 1);

            product.setProductCode(sellerCode + productCode + prefix);
            System.out.println(prefix);
        } catch (Exception e) {
            System.out.println("errrot" + e.getMessage());
        }

        return jdbcTemplate.update("insert into product " +
                        "(productCode, productName, price, stock, description, userCode, status, createdDate)" +
                        " values (?,?,?,?,?,?,?, now())",
                product.getProductCode(),
                product.getProductName(),
                product.getPrice(),
                product.getStock(),
                product.getDescription(),
                idSeller,
                product.getStatus()
        );
    }

    @Override
    public boolean isProductNameExist(String idSeller, String productName) {
        int count = jdbcTemplate.queryForObject(
                "select count(*) from product p where userCode = ? and productName = ?",
                Integer.class, idSeller, productName);
        if (count == 1) {
            return true;
        }
        return false;
    }

    @Override
    public boolean isProductExist(String productId) {
        int count = jdbcTemplate.queryForObject(
                "select count(*) from product p where productCode = ?",
                Integer.class, productId);
        if (count == 1) {
            return true;
        }
        return false;
    }

    @Override
    public int updateProduct(Product product) {
        return jdbcTemplate.update(
                "update product set " +
                        "productName = ?," +
                        "price =?, stock =?, " +
                        "description =? ," +
                        "status = ? " +
                        "where productCode =?",
                product.getProductName(),
                product.getPrice(),
                product.getStock(),
                product.getDescription(),
                product.getStatus(),
                product.getProductCode()
        );
    }
}
