package com.ztw.admin.goods.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * @Author 马旭
 * @Date 2017/8/1-14:24
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class GoodsDto {

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
     * 商品杨张图片,用于展示
     */
    private String showImgUrl;

    /**
     * 用于定制的商品图片
     */
    private String[] dzImgUrls;

    /**
     * 商品种类
     */
    private Category category;

    public GoodsDto() {

    }

    public GoodsDto(Goods goods, Category category) {
        this.id = goods.getId();
        this.title = goods.getTitle();
        this.number = goods.getNumber();
        this.labels = goods.getLabels();
        this.price = goods.getPrice();
        this.des = goods.getDes();
        this.showImgUrl = goods.getShowImgUrl();
        this.dzImgUrls = goods.getDzImgUrls();
        this.category = category;
    }

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

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
