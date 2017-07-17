package com.ztw.admin.security;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

/**
 * ${DESCRIPTION}
 *
 * @author 马旭
 * @created 2017-07-09 10:06.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class JwtUser implements UserDetails {

    private final String id;
    private final String username;
    private final String nickname;
    private final String password;
    private final boolean status;
    private final Collection<? extends GrantedAuthority> authorities;

    public JwtUser(String id, String username, String nickname, String password, boolean status, Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.username = username;
        this.nickname = nickname;
        this.password = password;
        this.status = status;
        this.authorities = authorities;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public String getId() {
        return id;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public String getNickname() {
        return nickname;
    }

    public boolean isStatus() {
        return status;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return status;
    }
}
