package com.ztw.common.model;

/**
 * RESTFul web service http请求返回对象
 *
 * @author 马旭
 * @created 2017-05-08 16:47.
 */
public class HttpResponse {

    /**
     * http返回码
     */
    private String resCode;

    /**
     * 返回消息
     */
    private String message;

    /**
     * 返回数据
     */
    private Object data;

    public String getResCode() {
        return resCode;
    }

    public void setResCode(String resCode) {
        this.resCode = resCode;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
