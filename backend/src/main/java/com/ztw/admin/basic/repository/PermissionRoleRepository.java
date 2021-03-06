package com.ztw.admin.basic.repository;

import com.ztw.admin.basic.model.PermissionRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * ${DESCRIPTION}
 *
 * @author 马旭
 * @created 2017-07-19 14:26.
 */
@Repository("permissionRoleRepository")
public interface PermissionRoleRepository extends JpaRepository<PermissionRole, String> {

    PermissionRole findByPermissionIdAndRoleId(String permissionId, String roleId);
    List<PermissionRole> findByRoleId(String id);
    void deleteByRoleId(String roleId);
    void deleteByRoleIdAndPermissionId(String roleId, String permissionId);
}
