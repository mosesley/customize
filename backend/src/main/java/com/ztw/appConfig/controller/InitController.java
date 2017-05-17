package com.ztw.appConfig.controller;

import com.ztw.appConfig.model.AppConfig;
import com.ztw.appConfig.model.InitBody;
import com.ztw.appConfig.repository.AppConfigRepository;
import com.ztw.common.model.HttpResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;

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
    private AppConfigRepository appConfigRepository;

    /**
     * 查看系统是否初始化
     * @return
     */
    @GetMapping(value = "")
    public HttpResponse getConfigIsExist() {
        HttpResponse res = new HttpResponse();
        res.setData(appConfigRepository.exists(1));
        return res;
    }

    /**
     * 系统初始化配置
     * @param initBody
     * @return
     */
    @PostMapping(value = "")
    @Transactional
    public HttpResponse initAppConfig(@RequestBody InitBody initBody) {
        System.out.println(initBody.toString());
        HttpResponse res = new HttpResponse();
        AppConfig appConfig = new AppConfig();

        if(!appConfigRepository.exists(1)) {
            appConfig.setAppName(initBody.getAppName());
            appConfig.setEmail(initBody.getEmail());
            res.setData(appConfigRepository.save(appConfig));
        }
        return res;
    }
}
