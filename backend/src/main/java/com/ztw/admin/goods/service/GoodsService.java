package com.ztw.admin.goods.service;

import com.ztw.admin.goods.model.Goods;
import com.ztw.admin.goods.model.GoodsDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * @Author 马旭
 * @Date 2017/8/1-11:34
 */
public interface GoodsService {
    Page<GoodsDto> findAll(Pageable pageable);
    Goods add(Goods goods);
    void delete(String id, String uploadDir);
    GoodsDto update(GoodsDto goodsDto);
}
