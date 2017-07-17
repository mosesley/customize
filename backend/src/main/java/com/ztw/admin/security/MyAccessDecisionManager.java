package com.ztw.admin.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.AccessDecisionManager;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Iterator;

/**
 * 验证资源跟角色之间的关系
 *
 * @author 马旭
 * @created 2017-07-17 15:26.
 */
@Component
public class MyAccessDecisionManager implements AccessDecisionManager {

    protected final Logger LOGGER = LoggerFactory.getLogger(getClass());

    @Override
    public void decide(Authentication authentication,
                       Object object,
                       Collection<ConfigAttribute> configAttributes)
            throws AccessDeniedException, InsufficientAuthenticationException {

        Collection<GrantedAuthority> userHasRoles = (Collection<GrantedAuthority>) authentication.getAuthorities();

        // 放行[超级管理员: ROLE_ADMIN]角色
        Iterator<GrantedAuthority> iterator = userHasRoles.iterator();
        while (iterator.hasNext()){
            GrantedAuthority grantedAuthority = iterator.next();
            if(grantedAuthority.getAuthority().equals("{authority=ROLE_ADMIN}")) {
                return;
            }
        }

        throw new AccessDeniedException("没有访问权限.");
    }

    @Override
    public boolean supports(ConfigAttribute attribute) {
        return true;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return true;
    }
}
