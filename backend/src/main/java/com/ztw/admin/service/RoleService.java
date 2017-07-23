package com.ztw.admin.service;

import com.ztw.admin.model.Role;

import java.util.List;

/**
 * ${DESCRIPTION}
 *
 * @author 马旭
 * @created 2017-07-19 15:47.
 */
public interface RoleService {
    List<Role> findAll();
    Role save(Role role);
    void delete(String id);
    Role update(Role role);
    void updatePermissionRole(String roleId, String permissionId, boolean checked);
}
