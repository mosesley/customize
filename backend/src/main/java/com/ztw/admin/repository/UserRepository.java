package com.ztw.admin.repository;

import com.ztw.admin.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * ${DESCRIPTION}
 *
 * @author 马旭
 * @created 2017-05-23 9:55.
 */
@Repository("userRepository")
public interface UserRepository extends JpaRepository<User, String> {

    // Get user information by username
    User findByUsername(String username);
}
