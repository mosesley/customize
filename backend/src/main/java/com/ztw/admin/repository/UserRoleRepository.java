package com.ztw.admin.repository;

import com.ztw.admin.model.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * ${DESCRIPTION}
 *
 * @author 马旭
 * @created 2017-07-09 11:08.
 */
@Repository("userRoleRepository")
public interface UserRoleRepository extends JpaRepository<UserRole, String> {
    List<UserRole> findByUserId(String userId);
    void deleteByUserId(String userId);
    void deleteByRoleId(String roleId);
    void deleteByUserIdAndRoleId(String userId, String roleId);
}
