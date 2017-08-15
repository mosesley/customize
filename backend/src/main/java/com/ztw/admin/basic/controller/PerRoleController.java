package com.ztw.admin.basic.controller;

import com.ztw.admin.basic.model.PermissionRole;
import com.ztw.admin.basic.repository.PermissionRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * ${DESCRIPTION}
 *
 * @author 马旭
 * @created 2017-07-21 16:43.
 */
@RestController
@RequestMapping(value = "/api/admin/per_role")
public class PerRoleController {

    @Autowired
    private PermissionRoleRepository permissionRoleRepository;

    /**
     * 根据permissionID 和 roleId获取对象
     * @return
     */
    @GetMapping(value = "")
    public PermissionRole find(@RequestParam("permissionId") String permissionId, @RequestParam("roleId") String roleId) {
        return permissionRoleRepository.findByPermissionIdAndRoleId(permissionId, roleId);
    }
}
