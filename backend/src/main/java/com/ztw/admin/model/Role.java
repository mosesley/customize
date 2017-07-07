package com.ztw.admin.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

/**
 * 用户角色类
 *
 * @author 马旭
 * @created 2017-05-18 9:07.
 */
@Entity
@Table(name = "t_role")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Role {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    private String id;

    /**
     * 角色名称
     */
    private String name;

    /**
     * 角色标识
     */
    private String role;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
