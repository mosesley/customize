package com.ztw.admin.goods.repository;

import com.ztw.admin.goods.model.GoodsCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @Author 马旭
 * @Date 2017/8/1-11:26
 */
@Repository(value = "goodsCategoryRepository")
public interface GoodsCategoryRepository extends JpaRepository<GoodsCategory, String> {
    GoodsCategory findByGoodsId(String goodsId);
    void deleteByCategoryId(String categoryId);
}
