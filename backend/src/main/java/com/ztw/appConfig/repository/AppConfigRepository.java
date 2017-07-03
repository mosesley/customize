package com.ztw.appConfig.repository;

import com.ztw.appConfig.model.AppConfig;
import org.springframework.data.repository.CrudRepository;

/**
 * App configuration repository
 *
 * @author 马旭
 * @created 2017-05-08 16:57.
 */
public interface AppConfigRepository extends CrudRepository<AppConfig, String> {


}
