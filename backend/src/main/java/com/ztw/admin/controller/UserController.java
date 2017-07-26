package com.ztw.admin.controller;

import com.ztw.admin.annotations.AuthPermission;
import com.ztw.admin.annotations.AutoMenu;
import com.ztw.admin.model.User;
import com.ztw.admin.model.UserDto;
import com.ztw.admin.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 用户管理api
 *
 * @author 马旭
 * @created 2017-05-18 10:57.
 */
@RestController
@RequestMapping(value = "/admin/user")
@AutoMenu(name = "用户", icon = "people", orderNum = 1)
@AuthPermission(name = "用户管理", url = "/admin/user")
public class UserController extends AuthRootMenu {

    @Autowired
    private UserService userService;

    /**
     * 获取用户列表
     * @return
     */
    @GetMapping(value = "/list")
    @AutoMenu(name = "用户列表", orderNum = 1)
    @AuthPermission(name = "用户列表", url = "/list", method = "GET")
    public Page<UserDto> list(@RequestParam("sort") String sort, @RequestParam("order") String order,
                              @RequestParam("page") Integer page, @RequestParam("pageSize") Integer pageSize) {
        Sort.Direction sort_order;
        if(order.equals("asc")) {
            sort_order = Sort.Direction.ASC;
        } else {
            sort_order = Sort.Direction.DESC;
        }
        Pageable pageable = new PageRequest(page, pageSize, new Sort(sort_order , sort));
        return userService.findAll(pageable);
    }

    /**
     * 添加用户
     * @param user
     * @return
     */
    @PostMapping(value = "/add")
    @Transactional
    @AuthPermission(name = "添加用户", url = "/add", method = "POST")
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
    @AuthPermission(name = "删除用户", url = "/{id}/delete", method = "DELETE")
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
    @AuthPermission(name = "更新用户", url = "/update", method = "PUT")
    public User update(@RequestBody User user, HttpServletResponse response) throws IOException {
        try {
            return userService.updateUser(user);
        } catch (RuntimeException e) {
            response.sendError(response.SC_EXPECTATION_FAILED, e.getMessage());
            return null;
        }
    }
}
