package com.ztw.admin.repository;

import com.ztw.admin.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * ${DESCRIPTION}
 *
 * @author 马旭
 * @created 2017-05-23 9:55.
 */
public interface UserRepository extends JpaRepository<User, String> {

    // Get user information by username
    User findByUsername(String username);
}
