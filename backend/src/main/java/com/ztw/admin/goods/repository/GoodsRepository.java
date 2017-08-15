package com.ztw.admin.goods.repository;

import com.ztw.admin.goods.model.Goods;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @Author 马旭
 * @Date 2017/8/1-11:33
 */
@Repository(value = "goodsRepository")
public interface GoodsRepository extends JpaRepository<Goods, String> {
    Goods findByTitle(String title);
}
