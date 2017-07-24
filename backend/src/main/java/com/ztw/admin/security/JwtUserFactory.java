package com.ztw.admin.security;

import com.ztw.admin.model.Role;
import com.ztw.admin.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * ${DESCRIPTION}
 *
 * @author 马旭
 * @created 2017-07-09 10:18.
 */
public final class JwtUserFactory {

    public static JwtUser create(User user, List<Role> roles) {
        List<String> authorities = new ArrayList<>();
        for(Role r: roles) {
            if(r.getRole().equals("ROLE_ADMIN")) {
                authorities.add(r.getRole());
            } else {
                authorities.add(r.getId());
            }
        }
        return new JwtUser(
                user.getId(),
                user.getUsername(),
                user.getNickname(),
                user.getPassword(),
                user.isStatus(), mapToGrantedAuthorities(authorities)
        );
    }

    private static List<GrantedAuthority> mapToGrantedAuthorities(List<String> authorities) {
        return authorities.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }
}
