package com.ztw.admin.service;

import com.ztw.admin.model.User;
import com.ztw.admin.model.UserDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * ${DESCRIPTION}
 *
 * @author 马旭
 * @created 2017-07-11 11:53.
 */
public interface UserService {

    Page<UserDto> findAll(Pageable pageable);
    User saveUser(User user);
    void deleteUser(String id);
    User updateUser(User user);
}
