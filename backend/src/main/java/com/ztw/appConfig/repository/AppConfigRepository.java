package com.ztw.appConfig.repository;

import com.ztw.appConfig.model.AppConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * App configuration repository
 *
 * @author 马旭
 * @created 2017-05-08 16:57.
 */
@Repository("appConfigRepository")
public interface AppConfigRepository extends JpaRepository<AppConfig, String> {

}
