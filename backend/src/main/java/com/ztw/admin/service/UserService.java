package com.ztw.admin.service;

import com.ztw.admin.model.User;
import com.ztw.admin.repository.UserRepository;
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
    public User addUser(User user) throws RuntimeException {
        User existUser = userRepository.findByUsername(user.getUsername());
        if(existUser != null) {
            throw new RuntimeException("添加的用户已存在!");
        }

        try {
            user.setAdmin(false);
            user.setPassword(SecurityUtil.md5(user.getUsername(), user.getPassword()));
            user.setCreateDate(new Date());
            return userRepository.save(user);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("添加用户异常!");
        }
    }

    /**
     * 删除用户
     * @param id
     * @return
     */
    public void deleteUser(String id) throws RuntimeException {
        if(!userRepository.exists(id)) {
            throw new RuntimeException("删除用户不存在！");
        } else {
            userRepository.delete(id);
        }
        if(userRepository.exists(id)) {
            throw new RuntimeException("删除用户失败!");
        }
    }

    /**
     * 更新用户
     * @param user
     * @return
     */
    public User updateUser(User user) {
        // 密码修改
        try {
            if(user.getPassword().length() > 0) {
                user.setPassword(SecurityUtil.md5(user.getUsername(), user.getPassword()));
            } else {
                user.setPassword(userRepository.findOne(user.getId()).getPassword());
            }
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("密码更新失败!");
        }

        if(!userRepository.exists(user.getId())) {
           throw new RuntimeException("更新用户不存在！");
        }
        return userRepository.save(user);
    }
}
