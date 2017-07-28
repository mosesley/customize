package com.ztw.admin.basic.service;

import com.ztw.appConfig.model.AppConfig;
import com.ztw.appConfig.repository.AppConfigRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @Author 马旭
 * @Date 2017/7/28-10:21
 */
@Service(value = "appConfigService")
public class AppConfigServiceImpl implements AppConfigService {

    @Autowired
    private AppConfigRepository appConfigRepository;

    @Override
    public AppConfig findOne() {
        return appConfigRepository.findAll().get(0);
    }

    @Override
    public AppConfig update(AppConfig appConfig) {
        return appConfigRepository.save(appConfig);
    }
}
