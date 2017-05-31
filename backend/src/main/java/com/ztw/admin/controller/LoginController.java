package com.ztw.admin.controller;

import com.ztw.admin.model.User;
import com.ztw.admin.service.LoginService;
import com.ztw.common.model.HttpResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 后台登陆api
 *
 * @author 马旭
 * @created 2017-05-31 10:44.
 */
@RestController
@RequestMapping(value = "/api/admin/login")
public class LoginController {

    @Autowired
    private LoginService loginService;

    /**
     * 用户登录api
     * @param loginUser
     * @return
     */
    @PostMapping(value = "")
    public HttpResponse login(@RequestBody User loginUser) {
        return loginService.loginCheck(loginUser);
    }
}
