package com.ztw.admin.goods.repository;

import com.ztw.admin.goods.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @Author 马旭
 * @Date 2017/7/27-15:17
 */
@Repository(value = "CategoryRepository")
public interface CategoryRepository extends JpaRepository<Category, String> {
    Category findByCategory(String category);
}
