package com.ztw.common.util;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * MD5加密工具
 *
 * @author 马旭
 * @created 2017-05-17 14:56.
 */
public class SecurityUtil {

    public static String md5(String password) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("MD5");
        md.update(password.getBytes());
        return new BigInteger(1,md.digest()).toString(16);
    }

    public static String md5(String username, String password) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("MD5");
        md.update(username.getBytes());
        md.update(password.getBytes());
        return new BigInteger(1, md.digest()).toString(16);
    }
}
