package com.ztw.admin.annotations;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.METHOD;
import static java.lang.annotation.ElementType.TYPE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

/**
 * 权限资源annotation，用来在初始化时自动生成权限资源
 * parent：controller
 * children： method
 *
 * @author 马旭
 * @created 2017-07-19 9:12.
 */
@Retention(RUNTIME)
@Target({TYPE, METHOD})
public @interface AuthPermission {

    /**
     * 资源名称
     * @return
     */
    String name();

    /**
     * 资源 url
     * @return
     */
    String url();

    /**
     * 访问资源需要的方法
     * @return
     */
    String method() default "";
}
