package com.ztw.admin.basic.service;

import com.ztw.admin.basic.model.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * ${DESCRIPTION}
 *
 * @author 马旭
 * @created 2017-07-19 15:47.
 */
public interface RoleService {
    List<Role> findAll();
    Page<Role> findAll(Pageable pageable);
    List<Role> findByUserId(String userId);
    Role save(Role role);
    void delete(String id);
    Role update(Role role);
    void updatePermissionRole(String roleId, String permissionId, boolean checked);
}
