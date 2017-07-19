package com.ztw.admin.controller;

import com.ztw.admin.annotations.AuthPermission;
import com.ztw.admin.annotations.AutoMenu;
import com.ztw.admin.model.Role;
import com.ztw.admin.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

/**
 * 角色管理api
 *
 * @author 马旭
 * @created 2017-07-19 14:43.
 */
@RestController
@RequestMapping(value = "/admin/role")
@AutoMenu(name = "角色", icon = "verified_user", orderNum = 2)
@AuthPermission(name = "角色管理", url = "/admin/role")
public class RoleController extends AuthRootMenu{

    @Autowired
    private RoleService roleService;

    /**
     * 获取用户列表
     * @return
     */
    @GetMapping(value = "/list")
    @AutoMenu(name = "角色列表", orderNum = 1)
    @AuthPermission(name = "角色列表", url = "/list", method = "GET")
    public List<Role> list() {
        return roleService.findAll();
    }

    /**
     * 添加角色
     * @param role
     * @return
     */
    @PostMapping(value = "/add")
    @Transactional
    @AuthPermission(name = "添加用户", url = "/add", method = "POST")
    public Role add(@RequestBody Role role, HttpServletResponse response) throws IOException {
        try {
            return roleService.save(role);
        } catch (RuntimeException e) {
            response.sendError(response.SC_EXPECTATION_FAILED, e.getMessage());
            return null;
        }
    }

    /**
     * 删除角色
     * @param id
     * @return
     */
    @DeleteMapping(value = "/{id}/delete")
    @Transactional
    @AuthPermission(name = "删除角色", url = "/{id}/delete", method = "DELETE")
    public void delete(@PathVariable("id") String id, HttpServletResponse response) throws IOException {
        try {
            roleService.delete(id);
        } catch (RuntimeException e) {
            response.sendError(response.SC_EXPECTATION_FAILED, e.getMessage());
        }
    }

    /**
     * 更新角色
     * @param role
     * @return
     */
    @PutMapping(value = "/update")
    @Transactional
    @AuthPermission(name = "更新角色", url = "/update", method = "PUT")
    public Role update(@RequestBody Role role, HttpServletResponse response) throws IOException {
        try {
            return roleService.update(role);
        } catch (RuntimeException e) {
            response.sendError(response.SC_EXPECTATION_FAILED, e.getMessage());
            return null;
        }
    }

}