package com.ztw.appConfig.service;

import com.ztw.appConfig.model.AppConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

/**
 * App configuration service
 *
 * @author 马旭
 * @created 2017-05-08 16:57.
 */
@Service(value = "appConfigService")
public interface IAppConfigService extends JpaRepository<AppConfig, Integer> {

}
