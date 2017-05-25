package com.ztw.admin.model;

import javax.persistence.*;
import java.util.List;

/**
 * 系统菜单类
 *
 * @author 马旭
 * @created 2017-05-18 9:18.
 */
@Entity
@Table(name = "t_menu")
public class Menu {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    /**
     * 菜单地址
     */
    private String path;

    /**
     * 菜单名称
     */
    private String name;

    /**
     * 菜单图标，采用font-awesome图标集
     */
    private String icon;

    /**
     * 菜单顺序
     */
    @Column(name = "order_num")
    private Integer orderNum;

    /**
     * 子菜单
     */
    @Column(name = "sub_menu")
    @OneToMany(cascade = {CascadeType.ALL})
    private List<Menu> subMenu;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public Integer getOrderNum() {
        return orderNum;
    }

    public void setOrderNum(Integer orderNum) {
        this.orderNum = orderNum;
    }

    public List<Menu> getSubMenu() {
        return subMenu;
    }

    public void setSubMenu(List<Menu> subMenu) {
        this.subMenu = subMenu;
    }

    @Override
    public String toString() {
        return "Menu{" +
                "id=" + id +
                ", path='" + path + '\'' +
                ", name='" + name + '\'' +
                ", icon='" + icon + '\'' +
                ", orderNum=" + orderNum +
                ", subMenu=" + subMenu +
                '}';
    }
}
