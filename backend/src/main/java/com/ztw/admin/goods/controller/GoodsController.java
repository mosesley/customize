package com.ztw.admin.goods.controller;

import com.ztw.admin.basic.annotations.AuthPermission;
import com.ztw.admin.basic.annotations.AutoMenu;
import com.ztw.admin.goods.model.GoodsDto;
import com.ztw.admin.goods.service.GoodsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * @Author 马旭
 * @Date 2017/8/1-9:44
 */
@RestController
@RequestMapping(value = "/admin/goods")
@AutoMenu(name = "商品", icon = "store", orderNum = 2)
@AuthPermission(name = "商品", url = "/admin/goods")
public class GoodsController extends GoodsRootMenu{

    @Autowired
    private GoodsService goodsService;

    @GetMapping(value = "/list")
    @AutoMenu(name = "商品列表", orderNum = 1)
    @AuthPermission(name = "商品列表", url = "/list", method = "GET")
    public Page<GoodsDto> list(@RequestParam("sort") String sort, @RequestParam("order") String order,
                               @RequestParam("page") Integer page, @RequestParam("pageSize") Integer pageSize) {
        Sort.Direction sort_order;
        if(order.equals("asc")) {
            sort_order = Sort.Direction.ASC;
        } else {
            sort_order = Sort.Direction.DESC;
        }
        Pageable pageable = new PageRequest(page, pageSize, new Sort(sort_order , sort));
        return goodsService.findAll(pageable);
    }

}
