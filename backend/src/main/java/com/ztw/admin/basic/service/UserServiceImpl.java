package com.ztw.admin.basic.service;

import com.ztw.admin.basic.model.User;
import com.ztw.admin.basic.model.UserDto;
import com.ztw.admin.basic.model.UserRole;
import com.ztw.admin.basic.repository.UserRepository;
import com.ztw.admin.basic.repository.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;

/**
 * 用户业务处理service
 *
 * @author 马旭
 * @created 2017-07-03 9:00.
 */
@Service(value = "userService")
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private RoleService roleService;

    /**
     * 分页获取用户
     * @param pageable
     * @return
     */
    @Override
    public Page<UserDto> findAll(Pageable pageable) {
        Page<User> userPage = userRepository.findAll(pageable);
        Page<UserDto> userDtoPage = userPage.map(
                source ->
                        new UserDto(source, roleService.findByUserId(source.getId()))
        );

        return userDtoPage;
    }

    /**
     * 添加用户
     * @return
     */
    @Override
    public User saveUser(User user) {
        User existUser = userRepository.findByUsername(user.getUsername());
        if(existUser != null) {
            throw new RuntimeException("添加的用户已存在!");
        }
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setStatus(true);
        user.setCreateDate(new Date());
        User su = userRepository.save(user);
        User u = new User(su.getId(), su.getUsername(), su.getNickname(),"", su.isStatus(), su.getCreateDate());
        return u;
    }

    /**
     * 删除用户
     * @param id
     * @return
     */
    @Override
    public void deleteUser(String id) throws RuntimeException {

        if(!userRepository.exists(id)) {
            throw new RuntimeException("删除用户不存在！");
        } else {
            userRepository.delete(id);
            userRoleRepository.deleteByUserId(id);
        }
        if(userRepository.exists(id)) {
            throw new RuntimeException("删除用户失败!");
        }
    }

    /**
     * 更新用户
     * @param user
     * @return
     */
    @Override
    public User updateUser(User user) {
        if(user.getPassword().length() > 0) {
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        } else {
            user.setPassword(userRepository.findOne(user.getId()).getPassword());
        }

        if(!userRepository.exists(user.getId())) {
            throw new RuntimeException("更新用户不存在！");
        }

        User su = userRepository.save(user);
        User u = new User(su.getId(), su.getUsername(), su.getNickname(), "", su.isStatus(), su.getCreateDate());
        return u;
    }

    /**
     * 设置用户角色
     * @param userId
     * @param roleId
     * @param checked
     */
    @Override
    public void updateUserRole(String userId, String roleId, boolean checked) {
        if(checked) {
            UserRole ur = new UserRole();
            ur.setUserId(userId);
            ur.setRoleId(roleId);
            userRoleRepository.save(ur);
        } else {
            userRoleRepository.deleteByUserIdAndRoleId(userId, roleId);
        }
    }
}
