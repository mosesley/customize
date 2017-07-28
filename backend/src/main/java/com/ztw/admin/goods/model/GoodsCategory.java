package com.ztw.admin.goods.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 商品种类
 * @Author 马旭
 * @Date 2017/7/27-14:05
 */
@Entity
@Table(name = "t_goods_category")
@JsonIgnoreProperties(ignoreUnknown = true)
public class GoodsCategory {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    private String id;

    /**
     * 类型名称
     */
    private String name;

    /**
     * 类型标识，例如：CATEGORY_DHJ 标识打火机
     * 标识在数据库里不能重复
     */
    private String category;

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

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
