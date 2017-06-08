package com.ztw.appConfig.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

/**
 * 系统配置信息
 *
 * @author 马旭
 * @created 2017-05-08 16:40.
 */
@Entity
@Table(name = "t_app_config")
@JsonIgnoreProperties(ignoreUnknown = true)
public class AppConfig {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    private String id;

    /**
     * 系统名称
     */
    private String appName;

    /**
     * 管理者邮箱
     */
    private String email;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAppName() {
        return appName;
    }

    public void setAppName(String appName) {
        this.appName = appName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
