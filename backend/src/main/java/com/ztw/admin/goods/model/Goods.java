package com.ztw.admin.goods.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Arrays;

/**
 * 商品
 *
 * @Author 马旭
 * @Date 2017/8/1-10:20
 */
@Entity
@Table(name = "t_goods")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Goods {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    private String id;

    /**
     * 商品标题
     */
    private String title;

    /**
     * 商品编号
     */
    private String number;

    /**
     * 商品标签
     */
    private String[] labels;

    /**
     * 商品价格
     */
    private Double price;

    /**
     * 商品描述
     */
    private String des;

    /**
     * 商品样张图片,用于展示
     */
    private String showImgUrl;

    /**
     * 用于定制的商品图片
     */
    private String[] dzImgUrls;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String[] getLabels() {
        return labels;
    }

    public void setLabels(String[] labels) {
        this.labels = labels;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getDes() {
        return des;
    }

    public void setDes(String des) {
        this.des = des;
    }

    public String getShowImgUrl() {
        return showImgUrl;
    }

    public void setShowImgUrl(String showImgUrl) {
        this.showImgUrl = showImgUrl;
    }

    public String[] getDzImgUrls() {
        return dzImgUrls;
    }

    public void setDzImgUrls(String[] dzImgUrls) {
        this.dzImgUrls = dzImgUrls;
    }

    @Override
    public String toString() {
        return "Goods{" +
                "id='" + id + '\'' +
                ", title='" + title + '\'' +
                ", number='" + number + '\'' +
                ", labels=" + Arrays.toString(labels) +
                ", price=" + price +
                ", des='" + des + '\'' +
                ", showImgUrl='" + showImgUrl + '\'' +
                ", dzImgUrls=" + Arrays.toString(dzImgUrls) +
                '}';
    }
}
