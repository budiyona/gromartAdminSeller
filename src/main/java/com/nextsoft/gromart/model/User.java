package com.nextsoft.gromart.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalTime;


@Getter
@Setter
@NoArgsConstructor
@ToString
public class User {
    private String userCode;
    private String userName;
    private String phone;
    private String email;
    private String password;
    private String status;
    private String createdBy;
    private String createdDate;
    private String updateBy;
    private String updateDate;

    public User(String userCode,
                String userName,
                String phone,
                String email,
                String password,
                String status,
                String createdBy,
                String createdDate,
                String updateBy,
                String updateDate) {
        this.userCode = userCode;
        this.userName = userName;
        this.phone = phone;
        this.email = email;
        this.password = password;
        this.status = status;
        this.createdBy = createdBy;
        this.createdDate = createdDate;
        this.updateBy = updateBy;
        this.updateDate = updateDate;
    }

    public User(String userCode, String userName, String status) {
        this.userCode = userCode;
        this.userName = userName;
        this.status = status;
    }
}
