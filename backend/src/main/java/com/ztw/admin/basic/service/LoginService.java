package com.ztw.admin.basic.service;

import com.ztw.admin.basic.security.JwtAuthenticationRequest;
import org.springframework.mobile.device.Device;

/**
 * 后台用户登录service
 *
 * @author 马旭
 * @created 2017-05-31 11:02.
 */
public interface LoginService {

    /**
     * 登陆用户检测
     * @param authenticationRequest
     * @return
     */
    String loginCheck(JwtAuthenticationRequest authenticationRequest, Device device);
}
