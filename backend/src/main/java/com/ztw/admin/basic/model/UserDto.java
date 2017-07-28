package com.ztw.admin.basic.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.Date;
import java.util.List;

/**
 * @Author 马旭
 * @Date 2017/7/26-13:24
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserDto {

    private String id;

    /**
     * 用户名
     */
    private String username;

    /**
     * 用户昵称
     */
    private String nickname;

    /**
     * 状态
     * true: 正常
     * false： 停用
     */
    private boolean status;

    /**
     * 是否事超级管理员
     */
    private boolean admin;

    /**
     * 创建日期
     */
    private Date createDate;

    /**
     * 用户角色
     */
    private List<Role> roles;

    public UserDto() {

    }

    public UserDto(User user, List<Role> roles) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.nickname = user.getNickname();
        this.status = user.isStatus();
        this.admin = checkIsAdmin(roles);
        this.createDate = user.getCreateDate();
        this.roles = roles;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public boolean isAdmin() {
        return admin;
    }

    public void setAdmin(boolean admin) {
        this.admin = admin;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

    private boolean checkIsAdmin(List<Role> roles) {
        for(Role role: roles) {
            if(role.getRole().equals("ROLE_ADMIN")) {
                return true;
            }
        }
        return false;
    }
}
