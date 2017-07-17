package com.ztw.admin.security;

import java.io.Serializable;

/**
 * ${DESCRIPTION}
 *
 * @author 马旭
 * @created 2017-07-16 11:06.
 */
public class JwtAuthenticationRequest implements Serializable {
    private static final long serialVersionUID = -3426623048482978448L;

    private String username;
    private String password;

    public JwtAuthenticationRequest() {
        super();
    }

    public JwtAuthenticationRequest(String username, String password) {
        this.setUsername(username);
        this.setPassword(password);
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
