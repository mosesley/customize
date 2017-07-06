package com.ztw.admin.service;

import com.ztw.admin.model.User;
import com.ztw.admin.repository.UserRepository;
import com.ztw.common.util.SecurityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.security.auth.login.LoginException;
import java.security.NoSuchAlgorithmException;

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

    /**
     * 登陆用户检测
     * @param loginUser
     * @return
     */
    public User loginCheck(User loginUser) throws LoginException {
        User existUser = userRepository.findByUsername(loginUser.getUsername());
        try {
            // 登陆用户不存在或已被停用
            if(existUser == null || !existUser.getStatus()) {
                throw new LoginException("登陆用户不存在或已被停用!");
            }

            // 密码输入不正确
            if(!existUser.getPassword().equals(SecurityUtil.md5(loginUser.getUsername(), loginUser.getPassword()))) {
                throw new LoginException("密码输入不正确!");
            }
        } catch (NoSuchAlgorithmException e) {
            throw new LoginException("登陆异常!");
        }

        return existUser;
    }
}
