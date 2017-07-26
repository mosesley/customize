package com.ztw.admin.controller;

import com.ztw.admin.model.PermissionRole;
import com.ztw.admin.repository.PermissionRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
     * 根据permissionID 和 roleId获取对象
     * @return
     */
    @GetMapping(value = "")
    public PermissionRole find(@RequestParam("permissionId") String permissionId, @RequestParam("roleId") String roleId) {
        return permissionRoleRepository.findByPermissionIdAndRoleId(permissionId, roleId);
    }
}
