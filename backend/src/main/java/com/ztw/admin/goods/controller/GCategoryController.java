package com.ztw.admin.goods.controller;

import com.ztw.admin.basic.annotations.AuthPermission;
import com.ztw.admin.basic.annotations.AutoMenu;
import com.ztw.admin.goods.model.GoodsCategory;
import com.ztw.admin.goods.service.GoodsCategoryService;
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
 * 商品种类controller
 * @Author 马旭
 * @Date 2017/7/27-14:50
 */
@RestController
@RequestMapping(value = "/admin/goods/category")
@AutoMenu(name = "商品种类", icon = "class", orderNum = 1)
@AuthPermission(name = "商品种类", url = "/admin/goods/category")
public class GCategoryController extends GoodsRootMenu{


    @Autowired
    private GoodsCategoryService goodsCategoryService;

    @GetMapping(value = "/list")
    @AutoMenu(name = "种类列表", orderNum = 1)
    @AuthPermission(name = "种类列表", url = "/list", method = "GET")
    public Page<GoodsCategory> list(@RequestParam("sort") String sort, @RequestParam("order") String order,
                                    @RequestParam("page") Integer page, @RequestParam("pageSize") Integer pageSize) {
        Sort.Direction sort_order;
        if(order.equals("asc")) {
            sort_order = Sort.Direction.ASC;
        } else {
            sort_order = Sort.Direction.DESC;
        }
        Pageable pageable = new PageRequest(page, pageSize, new Sort(sort_order , sort));
        return goodsCategoryService.findAll(pageable);
    }

    @PostMapping(value = "/add")
    @AuthPermission(name = "添加商品种类", url = "/add", method = "POST")
    @Transactional
    public GoodsCategory add(@RequestBody GoodsCategory gc, HttpServletResponse response) throws IOException {
        try {
            return goodsCategoryService.save(gc);
        } catch (RuntimeException e) {
            response.sendError(response.SC_EXPECTATION_FAILED, e.getMessage());
            return null;
        }
    }

    @DeleteMapping(value = "/{id}/delete")
    @AuthPermission(name = "删除商品种类", url = "/{id}/delete", method = "DELETE")
    @Transactional
    public void delete(@PathVariable("id") String id) {
        goodsCategoryService.delete(id);
    }
}
