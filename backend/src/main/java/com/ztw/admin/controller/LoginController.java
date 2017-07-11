package com.ztw.admin.controller;

import com.ztw.admin.model.User;
import com.ztw.admin.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.security.auth.login.LoginException;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 后台登陆api
 *
 * @author 马旭
 * @created 2017-05-31 10:44.
 */
@RestController
@RequestMapping(value = "/admin/login")
public class LoginController {

    @Autowired
    private LoginService loginService;

    /**
     * 用户登录api
     * @param loginUser
     * @return
     */
    @PostMapping(value = "")
    public User login(@RequestBody User loginUser, HttpServletResponse response) throws IOException {
        try {
            return loginService.loginCheck(loginUser);
        } catch (LoginException e) {
            response.sendError(response.SC_EXPECTATION_FAILED, e.getMessage());
            return null;
        }
    }
}
