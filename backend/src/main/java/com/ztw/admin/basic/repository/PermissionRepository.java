package com.ztw.admin.basic.repository;

import com.ztw.admin.basic.model.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * ${DESCRIPTION}
 *
 * @author 马旭
 * @created 2017-07-19 14:25.
 */
@Repository("permissionRepository")
public interface PermissionRepository extends JpaRepository<Permission, String> {

    @Query("select distinct p from Permission p where p.method = '' order by p.name asc")
    @Override
    List<Permission> findAll();

}
