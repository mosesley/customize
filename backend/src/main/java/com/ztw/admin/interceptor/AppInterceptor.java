package com.ztw.admin.interceptor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * App Interceptor
 *
 * @author 马旭
 * @created 2017-07-06 10:16.
 */
@Configuration
public class AppInterceptor extends WebMvcConfigurerAdapter {

    @Bean
    AuthHandlerInterceptor authHandlerInterceptor() {
        return new AuthHandlerInterceptor();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(authHandlerInterceptor()).addPathPatterns("/api/admin/user/update");
        super.addInterceptors(registry);
    }
}
