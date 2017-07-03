package com.ztw.admin.controller;

import com.ztw.admin.annotations.AutoMenu;
import com.ztw.admin.model.User;
import com.ztw.admin.repository.UserRepository;
import com.ztw.admin.service.UserService;
import com.ztw.common.model.HttpResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 用户管理api
 *
 * @author 马旭
 * @created 2017-05-18 10:57.
 */
@RestController
@RequestMapping(value = "/api/admin/user")
@AutoMenu(name = "用户", icon = "people", orderNum = 1)
public class UserController extends AuthRootMenu {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    /**
     * 获取用户列表
     * @return
     */
    @GetMapping(value = "/list")
    @AutoMenu(name = "用户列表", orderNum = 1)
    public HttpResponse list() {
        HttpResponse res = new HttpResponse();
        List<User> users = userRepository.findAll();
        for (User user: users) {
            user.setPassword(""); // 不查询密码
        }
        res.setData(users);
        return res;
    }

    /**
     * 添加用户
     * @param user
     * @return
     */
    @PostMapping(value = "/add")
    public HttpResponse add(@RequestBody User user) {
        return userService.addUser(user);
    }
}
