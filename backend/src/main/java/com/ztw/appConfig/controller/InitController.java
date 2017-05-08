package com.ztw.appConfig.controller;

import com.ztw.appConfig.service.IAppConfigService;
import com.ztw.common.model.HttpResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * App configuration api
 *
 * @author 马旭
 * @created 2017-05-08 16:54.
 */
@RestController
@RequestMapping(value = "/api/appConfig")
public class InitController {

    @Autowired
    private IAppConfigService appConfigService;

    @GetMapping(value = "")
    public HttpResponse getConfig() {
        HttpResponse res = new HttpResponse();
        res.setData(appConfigService.findOne(1));
        return res;
    }
}
