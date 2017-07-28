package com.ztw.admin.basic.controller;

import com.ztw.admin.basic.annotations.AutoMenu;

/**
 * 权限管理根菜单, 在权限管理菜单下的子菜单需要继承此类
 *
 * @author 马旭
 * @created 2017-05-22 17:13.
 */
@AutoMenu(name = "权限管理", icon = "security", orderNum = 2)
public abstract class AuthRootMenu {

}
