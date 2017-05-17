package com.ztw;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

/**
 * SpringBoot application bootstrap
 * This is a RESTFul web repository
 *
 * @author 马旭
 * @created 2017-05-08 16:32.
 * @CrossOrigin 跨域访问，用于开发过程，前端打包加入后需要删除
 */
@SpringBootApplication
@CrossOrigin(origins = "http://localhost:4200")
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}
