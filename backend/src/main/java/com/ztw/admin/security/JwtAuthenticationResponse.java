package com.ztw.admin.security;

import java.io.Serializable;

/**
 * ${DESCRIPTION}
 *
 * @author 马旭
 * @created 2017-07-09 13:36.
 */
public class JwtAuthenticationResponse implements Serializable {
    private static final long serialVersionUID = -2788417429358005883L;

    private final String token;

    public JwtAuthenticationResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return this.token;
    }
}
