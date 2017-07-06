package com.ztw.admin.controller;

import com.ztw.admin.model.Menu;
import com.ztw.admin.model.User;
import com.ztw.admin.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
    public List<Menu> getMenuByUser(@RequestBody User loginUser) {
        if(loginUser.isAdmin()) { // 如果是超级管理员，获取所有菜单
           return menuRepository.findAll(); // find root menu
        }
        return null;
    }
}
