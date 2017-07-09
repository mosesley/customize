package com.ztw.admin.repository;

import com.ztw.admin.model.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * ${DESCRIPTION}
 *
 * @author 马旭
 * @created 2017-07-09 11:08.
 */
public interface UserRoleRepository extends JpaRepository<UserRole, String> {

    List<UserRole> findByUserId(String userId);
}
