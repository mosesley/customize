package com.ztw.admin.repository;

import com.ztw.admin.model.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * ${DESCRIPTION}
 *
 * @author 马旭
 * @created 2017-07-19 14:25.
 */
@Repository("permissionRepository")
public interface PermissionRepository extends JpaRepository<Permission, String> {

}
