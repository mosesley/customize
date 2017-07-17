package com.ztw.admin.controller;

import com.ztw.admin.security.JwtAuthenticationRequest;
import com.ztw.admin.security.JwtAuthenticationResponse;
import com.ztw.admin.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mobile.device.Device;
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
@RequestMapping(value = "/admin/login")
public class LoginController {

    @Autowired
    private LoginService loginService;

    /**
     * 用户登录api
     * @param authenticationRequest
     * @return
     */
    @PostMapping(value = "")
    public ResponseEntity<?> login(@RequestBody JwtAuthenticationRequest authenticationRequest, Device device) {
        return ResponseEntity.ok(new JwtAuthenticationResponse(loginService.loginCheck(authenticationRequest, device)));
    }
}
