package com.ztw.admin.service;

import com.ztw.admin.model.User;
import com.ztw.admin.repository.UserRepository;
import com.ztw.admin.security.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.security.auth.login.LoginException;

/**
 * 后台用户登录service
 *
 * @author 马旭
 * @created 2017-05-31 11:02.
 */
@Service(value = "loginService")
public class LoginService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;


    /**
     * 登陆用户检测
     * @param loginUser
     * @return
     */
    public User loginCheck(User loginUser) throws LoginException {
        User existUser = userRepository.findByUsername(loginUser.getUsername());
        // 登陆用户不存在或已被停用
        if(existUser == null || !existUser.getStatus()) {
            throw new LoginException("登陆用户不存在或已被停用!");
        }

        UsernamePasswordAuthenticationToken upToken =
                new UsernamePasswordAuthenticationToken(loginUser.getUsername(),loginUser.getPassword());
        // Perform the security
        try {
            final Authentication authentication = authenticationManager.authenticate(upToken);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (AuthenticationException e) {
            throw new LoginException("密码输入不正确!");
        }

        // Reload password post-security so we can generate token
        existUser.setToken(JwtTokenUtil.generateToken(existUser.getUsername()));
        return existUser;
    }
}
