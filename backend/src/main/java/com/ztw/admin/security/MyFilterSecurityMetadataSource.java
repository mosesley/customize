package com.ztw.admin.security;

import com.ztw.admin.model.Permission;
import com.ztw.admin.repository.PermissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.web.FilterInvocation;
import org.springframework.security.web.access.intercept.FilterInvocationSecurityMetadataSource;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * ${DESCRIPTION}
 *
 * @author 马旭
 * @created 2017-07-18 14:50.
 */
@Component
public class MyFilterSecurityMetadataSource implements FilterInvocationSecurityMetadataSource{

    private static List<ConfigAttribute> attributes = new ArrayList<>();

    @Autowired
    private PermissionRepository permissionRepository;

    // 此方法是为了判定用户请求的url 是否在权限表中，如果在权限表中，则返回给 decide 方法，用来判定用户是否有此权限。如果不在权限表中则放行。
    @Override
    public Collection<ConfigAttribute> getAttributes(Object object) throws IllegalArgumentException {
        List<ConfigAttribute> reAttributes = new ArrayList<>();

        FilterInvocation fi = (FilterInvocation) object;
        AntPathRequestMatcher matcher;
        for(ConfigAttribute ca : getAllConfigAttributes()) {
            matcher = new AntPathRequestMatcher(((MyConfigAttribute) ca).getUrl(), ((MyConfigAttribute) ca).getMethod());
            if(matcher.matches(fi.getHttpRequest())) {
                reAttributes.add(ca);
            }
        }
        return reAttributes;
    }

    @Override
    public Collection<ConfigAttribute> getAllConfigAttributes() {
        if(!attributes.isEmpty()) {
            return attributes;
        }

        List<Permission> permissions = permissionRepository.findAll();
        for(Permission permission : permissions) {
            attributes.add(new MyConfigAttribute(permission.getId(), permission.getUrl(), permission.getMethod()));
            for(Permission subPer : permission.getSubPer()) {
                attributes.add(new MyConfigAttribute(subPer.getId(), subPer.getUrl(), subPer.getMethod()));
            }
        }
        return attributes;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return FilterInvocation.class.isAssignableFrom(clazz);
    }
}
