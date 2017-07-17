package com.ztw.admin.service;

import com.ztw.admin.model.Role;
import com.ztw.admin.model.User;
import com.ztw.admin.model.UserRole;
import com.ztw.admin.repository.RoleRepository;
import com.ztw.admin.repository.UserRepository;
import com.ztw.admin.repository.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * 用户业务处理service
 *
 * @author 马旭
 * @created 2017-07-03 9:00.
 */
@Service(value = "userService")
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    /**
     * 获取所有用户
     * @return
     */
    @Override
    public List<User> findAll() {
        List<User> users = userRepository.findAll();
        for (User user: users) {
            user.setPassword(""); // 不查询密码
        }
        return users;
    }

    /**
     * 添加用户
     * @return
     */
    @Override
    public User saveUser(User user) {
        User existUser = userRepository.findByUsername(user.getUsername());
        if(existUser != null) {
            throw new RuntimeException("添加的用户已存在!");
        }
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setCreateDate(new Date());
        User su = userRepository.save(user);
        User u = new User(su.getId(), su.getUsername(), su.getNickname(),"", su.isStatus(), su.getCreateDate());
        return u;
    }

    /**
     * 删除用户
     * @param id
     * @return
     */
    @Override
    public void deleteUser(String id) throws RuntimeException {

        List<String> ids = new ArrayList<>();
        List<UserRole> urs = userRoleRepository.findByUserId(id);
        for (UserRole ur: urs) {
            ids.add(ur.getRoleId());
        }
        List<Role> roles = roleRepository.findAll(ids);
        for(Role r: roles) {
            if(r.getRole().equals("ROLE_ADMIN")) {
                throw new RuntimeException("超级管理员不能删除！");
            }
        }

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
    @Override
    public User updateUser(User user) {

        // 密码修改
        if(user.getPassword().length() > 0) {
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        } else {
            user.setPassword(userRepository.findOne(user.getId()).getPassword());
        }

        if(!userRepository.exists(user.getId())) {
           throw new RuntimeException("更新用户不存在！");
        }

        List<String> ids = new ArrayList<>();
        List<UserRole> urs = userRoleRepository.findByUserId(user.getId());
        for (UserRole ur: urs) {
            ids.add(ur.getRoleId());
        }
        List<Role> roles = roleRepository.findAll(ids);
        for(Role r: roles) {
            if(r.getRole().equals("ROLE_ADMIN")) {
                return this.updateAdmin(user);
            }
        }

        User su = userRepository.save(user);
        User u = new User(su.getId(), su.getUsername(), su.getNickname(), "", su.isStatus(), su.getCreateDate());
        return u;
    }

    /**
     * 更新管理员
     * @param user
     * @return
     */
    @PreAuthorize("hasRole('ROLE_TELLER')")
    private User updateAdmin(User user) {
        User su = userRepository.save(user);
        User u = new User(su.getId(), su.getUsername(), su.getNickname(), "", su.isStatus(), su.getCreateDate());
        return u;
    }
}
