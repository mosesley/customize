package com.ztw.appConfig.controller;

import com.ztw.admin.model.Menu;
import com.ztw.admin.model.Role;
import com.ztw.admin.model.User;
import com.ztw.admin.model.UserRole;
import com.ztw.admin.repository.MenuRepository;
import com.ztw.admin.repository.RoleRepository;
import com.ztw.admin.repository.UserRepository;
import com.ztw.admin.repository.UserRoleRepository;
import com.ztw.appConfig.model.AppConfig;
import com.ztw.appConfig.model.InitBody;
import com.ztw.appConfig.repository.AppConfigRepository;
import com.ztw.appConfig.util.MenuUtil;
import com.ztw.common.util.SecurityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.List;

/**
 * App configuration api
 *
 * @author 马旭
 * @created 2017-05-08 16:54.
 */
@RestController
@RequestMapping(value = "/appConfig")
public class InitController {

    @Autowired
    private AppConfigRepository appConfigRepository;

    @Autowired
    private MenuRepository menuRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;



    /**
     * 查看系统是否初始化
     * @return
     */
    @GetMapping(value = "")
    public boolean getConfigIsExist() {
        return appConfigRepository.count() <= 0 ? false : true;
    }

    /**
     * 系统初始化配置
     * @param initBody
     * @return
     */
    @PostMapping(value = "")
    @Transactional
    public AppConfig initAppConfig(@RequestBody InitBody initBody) {
        AppConfig appConfig = new AppConfig();

        // 初始化超级管理员
        try {
            User adminUser = new User();
            adminUser.setUsername(initBody.getAdminName()); // 超级管理员登陆名
            adminUser.setPassword(SecurityUtil.md5(initBody.getAdminName(), initBody.getPassword()));
            adminUser.setNickname(initBody.getAdminName()); // 昵称，默认和登陆名一致
            adminUser.setStatus(true); // 设置为启用
            adminUser.setCreateDate(new Date()); // 创建时间

            User existAdminUser = userRepository.findByUsername(adminUser.getUsername());
            if(existAdminUser == null) {
                adminUser = userRepository.save(adminUser);
            } else {
                adminUser.setId(existAdminUser.getId());
                adminUser = userRepository.save(adminUser);
            }

            // 初始化角色
            Role role = new Role();
            role.setName("超级管理员");
            role.setRole("ROLE_ADMIN");
            roleRepository.deleteAll();
            role = roleRepository.save(role);

            // 初始化管理员角色
            UserRole ur = new UserRole();
            ur.setUserId(adminUser.getId());
            ur.setRoleId(role.getId());
            userRoleRepository.deleteAll();
            userRoleRepository.save(ur);

        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }

        // 初始化系统菜单
        List<Menu> existMenus = menuRepository.findAll();
        for ( Menu m: existMenus ) {
            menuRepository.delete(m);
        }
        List<Menu> menus = MenuUtil.buildAppAdminMenu("com/ztw/admin/controller/*.class");
        for (Menu menu: menus) {
            menuRepository.save(menu);
        }

        // 初始化系统设置信息
        appConfigRepository.deleteAll();
        appConfig.setAppName(initBody.getAppName());
        appConfig.setEmail(initBody.getEmail());

        return appConfigRepository.save(appConfig);
    }
}
