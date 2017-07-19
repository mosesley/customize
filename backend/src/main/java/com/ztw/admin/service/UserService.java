package com.ztw.admin.service;

import com.ztw.admin.model.User;

import java.util.List;

/**
 * ${DESCRIPTION}
 *
 * @author 马旭
 * @created 2017-07-11 11:53.
 */
public interface UserService {

    List<User> findAll();
    User saveUser(User user);
    void deleteUser(String id);
    User updateUser(User user);
    User updateAdmin(User user);
}
