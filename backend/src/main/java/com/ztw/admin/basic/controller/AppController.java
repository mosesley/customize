package com.ztw.admin.basic.controller;

import com.ztw.admin.basic.annotations.AutoMenu;
import com.ztw.admin.basic.service.AppConfigService;
import com.ztw.appConfig.model.AppConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * @Author 马旭
 * @Date 2017/7/28-9:28
 */
@RestController
@RequestMapping(value = "/api/admin/appConfig")
@AutoMenu(name = "系统设置", icon = "settings", orderNum = 1)
public class AppController extends AppRootMenu {

    @Autowired
    private AppConfigService appConfigService;

    @GetMapping(value = "")
    @AutoMenu(name = "系统信息", orderNum = 1)
    public AppConfig find() {
        return appConfigService.findOne();
    }

    @PostMapping(value = "")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public AppConfig update(@RequestBody AppConfig appConfig) {
        return appConfigService.update(appConfig);
    }

}
