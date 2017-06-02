package com.ztw.admin.controller;

import com.ztw.admin.model.User;
import com.ztw.admin.repository.MenuRepository;
import com.ztw.common.model.HttpResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

/**
 * ${DESCRIPTION}
 *
 * @author 马旭
 * @created 2017-05-31 11:58.
 */
@RestController
@RequestMapping(value = "/api/admin/menu")
public class MenuController {

    @Autowired
    private MenuRepository menuRepository;

    /**
     * 根据登陆的用户获取相应的菜单
     * @param loginUser
     * @return
     */
    @PostMapping(value = "")
    public HttpResponse getMenuByUser(@RequestBody User loginUser) {
        HttpResponse res = new HttpResponse();
        if(loginUser.isAdmin()) { // 如果是超级管理员，获取所有菜单
            res.setData(menuRepository.findAll());
        }

        return res;
    }
}
