package com.ztw.admin.goods.controller;

import com.ztw.admin.basic.annotations.AuthPermission;
import com.ztw.admin.basic.annotations.AutoMenu;
import com.ztw.admin.goods.model.Category;
import com.ztw.admin.goods.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @Author 马旭
 * @Date 2017/8/2-9:19
 */
@RestController
@RequestMapping(value = "/api/admin/goods/category")
@AutoMenu(name = "商品种类", icon = "style", orderNum = 1)
@AuthPermission(name = "商品种类", url = "/api/admin/goods/category")
public class CategoryController extends GoodsRootMenu {

    @Autowired
    private CategoryService categoryService;

    @GetMapping(value = "/list")
    @AutoMenu(name = "种类列表", orderNum = 1)
    @AuthPermission(name = "种类列表", url = "/list", method = "GET")
    public Page<Category> list(@RequestParam("sort") String sort, @RequestParam("order") String order,
                               @RequestParam("page") Integer page, @RequestParam("pageSize") Integer pageSize) {
        Sort.Direction sort_order;
        if(order.equals("asc")) {
            sort_order = Sort.Direction.ASC;
        } else {
            sort_order = Sort.Direction.DESC;
        }
        Pageable pageable = new PageRequest(page, pageSize, new Sort(sort_order , sort));
        return categoryService.findAll(pageable);
    }

    @PostMapping(value = "/add")
    @AuthPermission(name = "添加商品种类", url = "/add", method = "POST")
    @Transactional
    public Category add(@RequestBody Category category, HttpServletResponse response) throws IOException {
        try {
            return categoryService.save(category);
        } catch (RuntimeException e) {
            response.sendError(response.SC_EXPECTATION_FAILED, e.getMessage());
            return null;
        }
    }

    @DeleteMapping(value = "/{id}/delete")
    @AuthPermission(name = "删除商品种类", url = "/{id}/delete", method = "DELETE")
    @Transactional
    public void delete(@PathVariable("id") String id) {
        categoryService.delete(id);
    }
}
