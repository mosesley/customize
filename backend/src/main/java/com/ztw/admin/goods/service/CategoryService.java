package com.ztw.admin.goods.service;

import com.ztw.admin.goods.model.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * @Author 马旭
 * @Date 2017/7/27-15:19
 */
public interface CategoryService {
    List<Category> findAll();
    Page<Category> findAll(Pageable pageable);
    Category save(Category category) throws RuntimeException;
    void delete(String id);
}
