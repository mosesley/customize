package com.ztw.admin.goods.service;

import com.ztw.admin.basic.util.PinyinToolkit;
import com.ztw.admin.goods.model.GoodsCategory;
import com.ztw.admin.goods.repository.GoodsCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Author 马旭
 * @Date 2017/7/27-15:26
 */
@Service(value = "goodsCategoryService")
public class GoodsCategoryServiceImpl implements GoodsCategoryService {

    @Autowired
    private GoodsCategoryRepository goodsCategoryRepository;

    @Override
    public List<GoodsCategory> findAll() {
        return goodsCategoryRepository.findAll();
    }

    @Override
    public Page<GoodsCategory> findAll(Pageable pageable) {
        return goodsCategoryRepository.findAll(pageable);
    }

    @Override
    public GoodsCategory save(GoodsCategory gc) throws RuntimeException {
        gc.setCategory("CATEGORY_" + PinyinToolkit.cn2FirstSpell(gc.getName()).toUpperCase());
        if(goodsCategoryRepository.findByCategory(gc.getCategory()).equals(null)) {
            return goodsCategoryRepository.save(gc);
        } else {
            throw new RuntimeException("名称标识已经被使用，请换一个名称");
        }
    }

    @Override
    public void delete(String id) {
        goodsCategoryRepository.delete(id);
    }
}
