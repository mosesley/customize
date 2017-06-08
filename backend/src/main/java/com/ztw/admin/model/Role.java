package com.ztw.admin.model;

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
     * 角色资源标识
     */
    private String sn;

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

    public String getSn() {
        return sn;
    }

    public void setSn(String sn) {
        this.sn = sn;
    }
}
