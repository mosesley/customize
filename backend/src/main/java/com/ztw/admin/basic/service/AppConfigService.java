package com.ztw.admin.basic.service;

import com.ztw.appConfig.model.AppConfig;

/**
 * @Author 马旭
 * @Date 2017/7/28-9:48
 */
public interface AppConfigService {

    AppConfig findOne();
    AppConfig update(AppConfig appConfig);
}
