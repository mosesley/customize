package com.ztw.admin.repository;

import com.ztw.admin.model.Role;
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

}
