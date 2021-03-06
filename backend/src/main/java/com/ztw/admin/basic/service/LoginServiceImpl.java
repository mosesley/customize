package com.ztw.admin.basic.service;

import com.ztw.admin.basic.security.JwtAuthenticationRequest;
import com.ztw.admin.basic.security.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mobile.device.Device;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

/**
 * ${DESCRIPTION}
 *
 * @author 马旭
 * @created 2017-07-19 15:44.
 */
@Service(value = "loginService")
public class LoginServiceImpl implements LoginService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    /**
     * 登陆用户检测
     * @param authenticationRequest
     * @return
     */
    @Override
    public String loginCheck(JwtAuthenticationRequest authenticationRequest, Device device) throws AuthenticationException {
        // Perform the security
        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authenticationRequest.getUsername(),
                        authenticationRequest.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Reload password post-security so we can generate token
        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        final String token = JwtTokenUtil.generateToken(userDetails, device);

        // Return the token
        return token;
    }
}
