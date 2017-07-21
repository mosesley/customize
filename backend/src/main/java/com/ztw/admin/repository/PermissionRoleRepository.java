package com.ztw.admin.repository;

import com.ztw.admin.model.PermissionRole;
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
    List<PermissionRole> findByPermissionId(String id);
    List<PermissionRole> findByRoleId(String id);
    void deleteByRoleId(String roleId);
}
