package com.ztw.admin.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Set;

/**
 * 认证资源类，系统初始化自动生成，用来控制需要权限的api
 *
 * @author 马旭
 * @created 2017-07-19 9:00.
 */
@Entity
@Table(name = "t_permission")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Permission {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    private String id;

    /**
     * 资源名称
     */
    private String name;

    /**
     * 资源url
     */
    private String url;

    /**
     * 访问资源需要的方法 （GET, POST, PUT...）
     */
    private String method;

    /**
     * 子资源
     */
    @OneToMany(cascade = {CascadeType.ALL}, fetch = FetchType.EAGER)
    @JoinColumn(name = "pid")
    @OrderBy("name ASC")
    private Set<Permission> subPer;

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

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public Set<Permission> getSubPer() {
        return subPer;
    }

    public void setSubPer(Set<Permission> subPer) {
        this.subPer = subPer;
    }
}
