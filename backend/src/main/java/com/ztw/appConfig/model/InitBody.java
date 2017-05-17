package com.ztw.appConfig.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * 用来接受系统初始化数据
 *
 * @author 马旭
 * @created 2017-05-17 9:23.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class InitBody {
    /**
     * 系统名称
     */
    private String appName;

    /**
     * 管理者邮箱
     */
    private String email;

    /**
     * 管理员用户名
     */
    private String adminName;

    /**
     * 管理员密码
     */
    private String password;

    public String getAppName() {
        return appName;
    }

    public void setAppName(String appName) {
        this.appName = appName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAdminName() {
        return adminName;
    }

    public void setAdminName(String adminName) {
        this.adminName = adminName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "InitBody{" +
                "appName='" + appName + '\'' +
                ", email='" + email + '\'' +
                ", adminName='" + adminName + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
