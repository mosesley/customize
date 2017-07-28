package com.ztw.admin.goods.service;

import com.ztw.admin.goods.model.GoodsCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * @Author 马旭
 * @Date 2017/7/27-15:19
 */
public interface GoodsCategoryService {
    List<GoodsCategory> findAll();
    Page<GoodsCategory> findAll(Pageable pageable);
    GoodsCategory save(GoodsCategory gc) throws RuntimeException;
    void delete(String id);
}
