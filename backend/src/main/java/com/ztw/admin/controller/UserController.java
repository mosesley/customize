package com.ztw.admin.controller;

import com.ztw.admin.annotations.AutoMenu;
import com.ztw.admin.repository.UserRepository;
import com.ztw.common.model.HttpResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 用户管理api
 *
 * @author 马旭
 * @created 2017-05-18 10:57.
 */
@RestController
@RequestMapping(value = "/api/admin/user")
@AutoMenu(name = "用户", icon = "fa fa-users", orderNum = 1)
public class UserController extends AuthRootMenu {

    @Autowired
    private UserRepository userRepository;

    @GetMapping(value = "/list")
    @AutoMenu(name = "用户列表", icon = "fa fa-list", orderNum = 1)
    public HttpResponse list() {
        HttpResponse res = new HttpResponse();
        res.setData(userRepository.findAll());
        return res;
    }

    @GetMapping(value = "/test")
    @AutoMenu(name = "测试", icon = "fa fa-user", orderNum = 2)
    public HttpResponse test() {
        return new HttpResponse();
    }
}
