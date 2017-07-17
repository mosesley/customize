package com.ztw.admin.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.omg.PortableInterceptor.INACTIVE;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mobile.device.Device;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.*;
import java.util.stream.Collectors;

/**
 * ${DESCRIPTION}
 *
 * @author 马旭
 * @created 2017-07-09 12:09.
 */
public class JwtTokenUtil implements Serializable {

    private static final long serialVersionUID = 5562471121974689813L;
    private static final String SECRET = "silent";
    private static final Integer EXPIRATION = 604800;

    private static final String CLAIM_KEY_ID = "user_id";
    private static final String CLAIM_KEY_USERNAME = "sub";
    private static final String CLAIM_KEY_NICKNAME = "nickname";
    private static final String CLAIM_KEY_STATUS = "status";
    private static final String CLAIM_KEY_AUTHORITIES = "authorities";
    private static final String CLAIM_KEY_AUDIENCE = "aud";
    private static final String CLAIM_KEY_CREATED = "created";

    private static final String AUD_UNKNOWN = "unknown";
    private static final String AUD_WEB = "web";
    private static final String AUD_MOBILE = "mobile";
    private static final String AUD_TABLET = "tablet";

    /**
     * Generate token
     * @param userDetails
     * @return
     */
    public static String generateToken(UserDetails userDetails, Device device) {
        Map<String, Object> claims = new HashMap<>();
        claims.put(CLAIM_KEY_ID, ((JwtUser)userDetails).getId());
        claims.put(CLAIM_KEY_USERNAME, userDetails.getUsername());
        claims.put(CLAIM_KEY_NICKNAME, ((JwtUser)userDetails).getNickname());
        claims.put(CLAIM_KEY_AUDIENCE, generateAudience(device));
        claims.put(CLAIM_KEY_STATUS, ((JwtUser)userDetails).isStatus());
        claims.put(CLAIM_KEY_AUTHORITIES, userDetails.getAuthorities());
        claims.put(CLAIM_KEY_CREATED, new Date());
        return doGenerateToken(claims);
    }

    /**
     * Refresh token
     * @param token
     * @return
     */
    public String refreshToken(String token) {
        String refreshedToken;
        try {
            final Claims claims = getClaimsFromToken(token);
            claims.put(CLAIM_KEY_CREATED, new Date());
            refreshedToken = doGenerateToken(claims);
        } catch (Exception e) {
            refreshedToken = null;
        }
        return refreshedToken;
    }

    /**
     * Validate token
     * @param token
     * @param userDetails
     * @return
     */
    public static Boolean validateToken(String token, UserDetails userDetails) {
        JwtUser user = (JwtUser) userDetails;
        final String username = getUsernameFromToken(token);
        return (username.equals(user.getUsername()) && isTokenExpired(token));
    }

    /**
     * get user from token
     * @param token
     * @return
     */
    public static JwtUser getUserFromToken(String token) {
        JwtUser jwtUser;
        try {
            final Claims claims = getClaimsFromToken(token);
            String userId = (String) claims.get(CLAIM_KEY_ID);
            String username = claims.getSubject();
            String nickname = (String) claims.get(CLAIM_KEY_NICKNAME);
            boolean status = (boolean) claims.get(CLAIM_KEY_STATUS);
            Collection<? extends GrantedAuthority> authorities = parseArrayToAuthorities((List)claims.get(CLAIM_KEY_AUTHORITIES));
            jwtUser = new JwtUser(userId, username, nickname, "password", status, authorities);
        } catch (Exception e) {
            jwtUser = null;
        }
        return jwtUser;
    }

    /**
     * Get username from Token
     * @param token
     * @return
     */
    public static String getUsernameFromToken(String token) {
        String username;
        try {
            final Claims claims = getClaimsFromToken(token);
            username = claims.getSubject();
        } catch (Exception e) {
            username = null;
        }
        return username;
    }

    /**
     * Get created date from token
     * @param token
     * @return
     */
    public static Date getCreatedDateFromToken(String token) {
        Date created;
        try {
            final Claims claims = getClaimsFromToken(token);
            created = new Date((Long) claims.get(CLAIM_KEY_CREATED));
        } catch (Exception e) {
            created = null;
        }
        return created;
    }

    /**
     * Get expiration date from token
     * @param token
     * @return
     */
    public static Date getExpirationDateFromToken(String token) {
        Date expiration;
        try {
            final Claims claims = getClaimsFromToken(token);
            expiration = claims.getExpiration();
        } catch (Exception e) {
            expiration = null;
        }
        return expiration;
    }

    /**
     * Get audience form token
     * @param token
     * @return
     */
    public static String getAudienceFromToken(String token) {
        String audience;
        try {
            final Claims claims = getClaimsFromToken(token);
            audience = (String) claims.get(CLAIM_KEY_AUDIENCE);
        } catch (Exception e) {
            audience = null;
        }
        return audience;
    }

    /**
     * Can token be refreshed
     * @param token
     * @return
     */
    public static Boolean canTokenBeRefreshed(String token) {
        return (isTokenExpired(token) || ignoreTokenExpiration(token));
    }

    private static Claims getClaimsFromToken(String token) {
        Claims claims;
        try {
            claims = Jwts.parser()
                    .setSigningKey(SECRET)
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {
            claims = null;
        }
        return claims;
    }

    private static Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.after(new Date());
    }

    private static String generateAudience(Device device) {
        String audience = AUD_UNKNOWN;
        if (device.isNormal()) {
            audience = AUD_WEB;
        } else if (device.isTablet()) {
            audience = AUD_TABLET;
        } else if (device.isMobile()) {
            audience = AUD_MOBILE;
        }
        return audience;
    }

    private static Boolean ignoreTokenExpiration(String token) {
        String audience = getAudienceFromToken(token);
        return (AUD_TABLET.equals(audience) || AUD_MOBILE.equals(audience));
    }

    private static String doGenerateToken(Map<String, Object> claims) {
        final Date createdDate = (Date) claims.get(CLAIM_KEY_CREATED);
        final Date expirationDate = new Date(createdDate.getTime() + EXPIRATION * 1000);
        return Jwts.builder()
                .setClaims(claims)
                .setExpiration(expirationDate)
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();
    }

    private static Collection<? extends GrantedAuthority> parseArrayToAuthorities(List<String> roles) {
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        SimpleGrantedAuthority authority;
        for (Object role : roles) {
            authority = new SimpleGrantedAuthority(role.toString());
            authorities.add(authority);
        }
        return authorities;
    }
}
