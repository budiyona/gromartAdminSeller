package com.nextsoft.gromart.model;

import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;


@Getter
@Setter
@NoArgsConstructor
@ToString
@AllArgsConstructor
public class User {
    private String userCode;

    @NotBlank(message = "name cannot be empty")
    @Pattern(regexp = "^(?![ .]+$)[a-zA-Z .]*$", message = "name cannot be number or special character")
    private String userName;

    @NotBlank(message = "phone cannot be empty")
    @Pattern(regexp = "[0-9]{9,12}", message = "phone number minimum 8 number, max 12 and cannot be letter")
    private String phone;

    @NotBlank(message = "email cannot be empty")
    @Email(message = "incorrect email format")
    private String email;

    @NotBlank(message = "password cannot be empty")
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{8,}$", message = "incorrect password format, use at least 8 character, one number")
    private String password;

    private String status;
    private String createdBy;

    @NotBlank(message = "createdDate cannot be empty")
    private String createdDate;

    private String updateBy;

    @NotBlank(message = "updateDate cannot be empty")
    private String updateDate;

    private int productLimit;

    public User(String userCode, String userName, String status, String password) {
        this.userCode = userCode;
        this.userName = userName;
        this.status = status;
        this.password = password;
    }

    public User(String userCode, String userName) {
        this.userCode = userCode;
        this.userName = userName;
    }

    public User(String userName,
                String phone,
                String email,
                String password,
                String createdDate,
                String updateDate) {
        this.userName = userName;
        this.phone = phone;
        this.email = email;
        this.password = password;
        this.createdDate = createdDate;
        this.updateDate = updateDate;
    }

    public User(String userCode,
                String userName,
                String phone,
                String email,
                String status,
                String createdBy,
                String createdDate,
                String updateBy,
                String updateDate,
                int productLimit) {
        this.userCode = userCode;
        this.userName = userName;
        this.phone = phone;
        this.email = email;
        this.status = status;
        this.createdBy = createdBy;
        this.createdDate = createdDate;
        this.updateBy = updateBy;
        this.updateDate = updateDate;
        this.productLimit = productLimit;
    }
}
