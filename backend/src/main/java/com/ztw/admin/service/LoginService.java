package com.ztw.admin.service;

import com.ztw.admin.model.User;
import com.ztw.admin.repository.UserRepository;
import com.ztw.common.model.HttpResponse;
import com.ztw.common.util.SecurityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public HttpResponse loginCheck(User loginUser) {
        HttpResponse res = new HttpResponse();
        User existUser = userRepository.findByUsername(loginUser.getUsername());
        try {
            // 登陆用户不存在或已被停用
            if(existUser == null || !existUser.getStatus()) {
                res.setStatus("error");
                res.setStatusText("登陆用户不存在或已被停用");
                return res;
            }

            // 密码输入不正确
            if(!existUser.getPassword().equals(SecurityUtil.md5(loginUser.getUsername(), loginUser.getPassword()))) {
                res.setStatus("error");
                res.setStatusText("密码输入不正确");
                return res;
            }
        } catch (NoSuchAlgorithmException e) {
            res.setStatus("error");
            res.setStatusText("登陆异常");
            return res;
        }

        res.setData(existUser);
        return res;
    }
}
