package com.ztw.admin.controller;

import com.ztw.admin.model.Permission;
import com.ztw.admin.repository.PermissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * ${DESCRIPTION}
 *
 * @author 马旭
 * @created 2017-07-21 15:25.
 */
@RestController
@RequestMapping(value = "/admin/permission")
public class PermissionController {

    @Autowired
    private PermissionRepository permissionRepository;


    /**
     * 获取资源列表
     * @return
     */
    @GetMapping(value = "/list")
    public List<Permission> list() {
        return permissionRepository.findAll();
    }
}
