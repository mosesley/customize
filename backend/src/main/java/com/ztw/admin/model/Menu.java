package com.ztw.admin.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Set;

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
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    private String id;

    /**
     * 菜单地址
     * 如果菜单地址为null，则为根菜单
     */
    private String path;

    /**
     * 菜单名称
     */
    private String name;

    /**
     * 菜单图标，采用material-icon图标集
     */
    private String icon;

    /**
     * 菜单类型
     */
    private MenuType type;

    /**
     * 菜单顺序
     */
    @Column(name = "order_num")
    private Integer orderNum;

    /**
     * 子菜单
     */
    @OneToMany(cascade = {CascadeType.ALL}, fetch = FetchType.LAZY)
    @JoinColumn(name = "pid")
    @OrderBy("orderNum ASC")
    private Set<Menu> subMenu;

    public String getId() {
        return id;
    }

    public void setId(String id) {
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

    public Set<Menu> getSubMenu() {
        return subMenu;
    }

    public void setSubMenu(Set<Menu> subMenu) {
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
