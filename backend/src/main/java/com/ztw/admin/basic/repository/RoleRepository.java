package com.ztw.admin.basic.repository;

import com.ztw.admin.basic.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * ${DESCRIPTION}
 *
 * @author 马旭
 * @created 2017-07-09 10:56.
 */
@Repository("roleRepository")
public interface RoleRepository extends JpaRepository<Role, String> {
    Role findByRole(String role);
}
