package com.ztw.common.model;

/**
 * RESTFul web repository http请求返回对象
 *
 * @author 马旭
 * @created 2017-05-08 16:47.
 */
public class HttpResponse {

    /**
     * http返回码
     */
    private String status;

    /**
     * 返回消息
     */
    private String statusText;

    /**
     * 返回数据
     */
    private Object data;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getStatusText() {
        return statusText;
    }

    public void setStatusText(String statusText) {
        this.statusText = statusText;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
