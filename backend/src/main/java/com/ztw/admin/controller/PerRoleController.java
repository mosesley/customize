package com.ztw.admin.controller;

import com.ztw.admin.model.PermissionRole;
import com.ztw.admin.repository.PermissionRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * ${DESCRIPTION}
 *
 * @author 马旭
 * @created 2017-07-21 16:43.
 */
@RestController
@RequestMapping(value = "/admin/per_role")
public class PerRoleController {

    @Autowired
    private PermissionRoleRepository permissionRoleRepository;

    /**
     * 获取角色对应的资源列表
     * @return
     */
    @GetMapping(value = "/list_by_role/{id}")
    public List<PermissionRole> list(@PathVariable("id") String id) {
        return permissionRoleRepository.findByRoleId(id);
    }
}
