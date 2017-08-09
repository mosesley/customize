package com.ztw.admin.goods.service;

import com.ztw.admin.basic.util.PinyinToolkit;
import com.ztw.admin.goods.model.Category;
import com.ztw.admin.goods.repository.CategoryRepository;
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
@Service(value = "categoryService")
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private GoodsCategoryRepository goodsCategoryRepository;

    @Override
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    @Override
    public Page<Category> findAll(Pageable pageable) {
        return categoryRepository.findAll(pageable);
    }

    @Override
    public Category save(Category category) throws RuntimeException {
        category.setCategory("CATEGORY_" + PinyinToolkit.cn2FirstSpell(category.getName()).toUpperCase());
        if(categoryRepository.findByCategory(category.getCategory()) == null) {
            return categoryRepository.save(category);
        } else {
            throw new RuntimeException("名称标识已经被使用，请换一个名称");
        }
    }

    @Override
    public void delete(String id) {
        categoryRepository.delete(id);
        goodsCategoryRepository.deleteByCategoryId(id);
    }
}
