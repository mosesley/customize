package com.ztw.admin.basic.controller;

import com.ztw.admin.basic.model.Menu;
import com.ztw.admin.basic.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * ${DESCRIPTION}
 *
 * @author 马旭
 * @created 2017-07-10 12:17.
 */
@RestController
@RequestMapping(value = "/admin/menus")
public class MenuController {

    @Autowired
    private MenuRepository menuRepository;

    /**
     *
     * @return
     */
    @GetMapping(value = "")
    public List<Menu> getMenu() {
        return menuRepository.findAll(); // find root menu
    }
}
