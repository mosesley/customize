package com.ztw.admin.service;

import com.ztw.admin.model.User;
import com.ztw.admin.repository.UserRepository;
import com.ztw.common.model.HttpResponse;
import com.ztw.common.util.SecurityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;
import java.util.Date;

/**
 * 用户业务处理service
 *
 * @author 马旭
 * @created 2017-07-03 9:00.
 */
@Service(value = "userService")
public class UserService {

    @Autowired
    private UserRepository userRepository;

    /**
     * 添加用户
     * @return
     */
    public HttpResponse addUser(User user) {
        HttpResponse res = new HttpResponse();
        User existUser = userRepository.findByUsername(user.getUsername());

        if(existUser != null) {
            res.setStatus("error");
            res.setStatusText("添加的用户已存在!");
            return res;
        }

        try {
            user.setAdmin(false);
            user.setPassword(SecurityUtil.md5(user.getUsername(), user.getPassword()));
            user.setCreateDate(new Date());
            res.setData(userRepository.save(user));
            res.setStatus("ok");
            res.setStatusText("添加成功!");
        } catch (NoSuchAlgorithmException e) {
            res.setStatus("error");
            res.setStatusText("添加用户异常!");
            return res;
        }
        return res;
    }
}
