package com.ztw.admin.basic.security;

import org.springframework.security.access.ConfigAttribute;

/**
 * ${DESCRIPTION}
 *
 * @author 马旭
 * @created 2017-07-23 16:50.
 */
public class MyConfigAttribute implements ConfigAttribute {

    private String id;
    private String url;
    private String method;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public MyConfigAttribute(String id, String url, String method) {
        this.id = id;
        this.url = url;
        this.method = method;
    }

    @Override
    public String getAttribute() {
        return this.url + ";" + this.method;
    }
}
