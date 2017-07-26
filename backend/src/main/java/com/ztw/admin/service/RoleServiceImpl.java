package com.ztw.admin.service;

import com.ztw.admin.model.PermissionRole;
import com.ztw.admin.model.Role;
import com.ztw.admin.repository.PermissionRoleRepository;
import com.ztw.admin.repository.RoleRepository;
import com.ztw.admin.repository.UserRoleRepository;
import com.ztw.admin.util.PinyinToolkit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * ${DESCRIPTION}
 *
 * @author 马旭
 * @created 2017-07-19 15:50.
 */
@Service("roleService")
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Autowired
    private PermissionRoleRepository permissionRoleRepository;

    @Override
    public List<Role> findAll() {
        return roleRepository.findAll();
    }

    /**
     * 分页获取用户
     * @param pageable
     * @return
     */
    @Override
    public Page<Role> findAll(Pageable pageable) {
        return roleRepository.findAll(pageable);
    }

    @Override
    public Role save(Role role) throws RuntimeException {
        role.setRole("ROLE_" + PinyinToolkit.cn2FirstSpell(role.getName()).toUpperCase());
        Role r = roleRepository.findByRole(role.getRole());
        if(r == null) {
            return roleRepository.save(role);
        } else {
            throw new RuntimeException("角色标识已经被使用，请换一个角色名称");
        }
    }

    @Override
    public void delete(String id) {
        Role role = roleRepository.findOne(id);
        if(role.getRole().equals("ROLE_ADMIN")) {
            throw new RuntimeException("超级管理员角色不能删除");
        } else {
            roleRepository.delete(id);
            userRoleRepository.deleteByRoleId(id);
            permissionRoleRepository.deleteByRoleId(id);
        }
    }

    @Override
    public Role update(Role role) {
        if(role.getRole().equals("ROLE_ADMIN")) {
            throw new RuntimeException("超级管理员角色不能修改");
        } else {
            role.setRole("ROLE_" + PinyinToolkit.cn2FirstSpell(role.getName()).toUpperCase());
            Role r = roleRepository.findByRole(role.getRole());
            if(r == null) {
                return roleRepository.save(role);
            } else {
                throw new RuntimeException("角色标识已经被使用，请换一个角色名称");
            }
        }
    }

    @Override
    public void updatePermissionRole(String roleId, String permissionId, boolean checked) {
        if(checked) {
            PermissionRole pr = new PermissionRole();
            pr.setPermissionId(permissionId);
            pr.setRoleId(roleId);
            permissionRoleRepository.save(pr);
        } else {
            permissionRoleRepository.deleteByRoleIdAndPermissionId(roleId, permissionId);
        }
    }
}
