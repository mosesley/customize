package com.ztw.admin.controller;

import com.ztw.admin.annotations.AutoMenu;
import com.ztw.admin.model.User;
import com.ztw.admin.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

/**
 * 用户管理api
 *
 * @author 马旭
 * @created 2017-05-18 10:57.
 */
@RestController
@RequestMapping(value = "/admin/user")
@AutoMenu(name = "用户", icon = "people", orderNum = 1)
public class UserController extends AuthRootMenu {

    @Autowired
    private UserService userService;

    /**
     * 获取用户列表
     * @return
     */
    @GetMapping(value = "/list")
    @AutoMenu(name = "用户列表", orderNum = 1)
    public List<User> list() {
        return userService.findAll();
    }

    /**
     * 添加用户
     * @param user
     * @return
     */
    @PostMapping(value = "/add")
    @Transactional
    public User add(@RequestBody User user, HttpServletResponse response) throws IOException {
        try {
            return userService.saveUser(user);
        } catch (RuntimeException e) {
            response.sendError(response.SC_EXPECTATION_FAILED, e.getMessage());
            return null;
        }
    }

    /**
     * 删除用户
     * @param id
     * @return
     */
    @DeleteMapping(value = "/{id}/delete")
    @Transactional
    public void delete(@PathVariable("id") String id, HttpServletResponse response) throws IOException {
        try {
            userService.deleteUser(id);
        } catch (RuntimeException e) {
            response.sendError(response.SC_EXPECTATION_FAILED, e.getMessage());
        }
    }

    /**
     * 更新用户
     * @param user
     * @return
     */
    @PutMapping(value = "/update")
    @Transactional
    public User update(@RequestBody User user, HttpServletResponse response) throws IOException {
        try {
            return userService.updateUser(user);
        } catch (RuntimeException e) {
            response.sendError(response.SC_EXPECTATION_FAILED, e.getMessage());
            return null;
        }
    }
}
