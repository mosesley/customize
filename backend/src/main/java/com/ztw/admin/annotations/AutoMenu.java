package com.ztw.admin.annotations;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;
import static java.lang.annotation.ElementType.METHOD;
import static java.lang.annotation.ElementType.TYPE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

/**
 * 菜单annotation，用户系统初始化自动生成菜单数据
 * 根菜单必须是抽象类，子菜单是controller，三级菜单是controller方法
 *
 * @author 马旭
 * @created 2017-05-22 16:39.
 */
@Retention(RUNTIME)
@Target({TYPE, METHOD})
public @interface AutoMenu {

    /**
     * 菜单名称
     * @return
     */
    String name();

    /**
     * 菜单图标，采用font-awesome图标集
     * @return
     */
    String icon() default "fa fa-cog";

    /**
     * 菜单序号
     * @return
     */
    int orderNum();

}
