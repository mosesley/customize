package com.ztw.admin.basic.security;

import com.ztw.admin.basic.model.PermissionRole;
import com.ztw.admin.basic.repository.PermissionRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDecisionManager;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.FilterInvocation;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;

/**
 * 验证资源跟角色之间的关系
 *
 * @author 马旭
 * @created 2017-07-17 15:26.
 */
@Component
public class MyAccessDecisionManager implements AccessDecisionManager {

    @Autowired
    private PermissionRoleRepository permissionRoleRepository;

    @Override
    public void decide(Authentication authentication,
                       Object object,
                       Collection<ConfigAttribute> configAttributes)
            throws AccessDeniedException, InsufficientAuthenticationException {
        Collection<GrantedAuthority> userHasRoles = (Collection<GrantedAuthority>) authentication.getAuthorities();

        // 放行[超级管理员: ROLE_ADMIN]角色
        Iterator<GrantedAuthority> iterator = userHasRoles.iterator();
        List<String> gaIds = new ArrayList<>();
        while (iterator.hasNext()){
            GrantedAuthority grantedAuthority = iterator.next();
            // System.out.println(grantedAuthority.getAuthority());
            if(grantedAuthority.getAuthority().equals("ROLE_ADMIN")) {
                return;
            } else {
                List<PermissionRole> prs = permissionRoleRepository.findByRoleId(grantedAuthority.getAuthority());
                for(PermissionRole pr : prs) {
                    gaIds.add(pr.getPermissionId());
                }
            }
        }

        // 如果不是超级管理员，判断权限
        List<String> caIds = new ArrayList<>();
        Iterator<ConfigAttribute> caIterator = configAttributes.iterator();
        while (caIterator.hasNext()) {
            ConfigAttribute ca = caIterator.next();
            caIds.add(((MyConfigAttribute) ca).getId());
        }

        if(gaIds.containsAll(caIds)) {
            return;
        }

        throw new AccessDeniedException("当前用户没有权限");
    }

    @Override
    public boolean supports(ConfigAttribute attribute) {
        return true;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return FilterInvocation.class.isAssignableFrom(clazz);
    }
}
