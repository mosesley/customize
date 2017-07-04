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

    /**
     * 删除用户
     * @param id
     * @return
     */
    public HttpResponse deleteUser(String id) {
        HttpResponse res = new HttpResponse();
        userRepository.delete(id);

        if(userRepository.exists(id)) {
            res.setStatus("error");
            res.setStatusText("删除用户失败");
        } else {
            res.setStatus("ok");
        }

        return res;
    }

    /**
     * 更新用户
     * @param user
     * @return
     */
    public HttpResponse updateUser(User user) {
        HttpResponse res = new HttpResponse();

        // 密码修改
        try {
            if(user.getPassword().length() > 0) {
                user.setPassword(SecurityUtil.md5(user.getUsername(), user.getPassword()));
            } else {
                user.setPassword(userRepository.findOne(user.getId()).getPassword());
            }
        } catch (NoSuchAlgorithmException e) {
            res.setStatus("error");
            res.setStatusText("密码更新失败");
            return res;
        }

        User existUser = userRepository.save(user);
        if(existUser == null) {
            res.setStatus("error");
            res.setStatusText("用户更新失败或更新用户不存在");
        } else {
            res.setStatus("ok");
            existUser.setPassword("");
            res.setData(existUser);
        }
        return res;
    }
}
