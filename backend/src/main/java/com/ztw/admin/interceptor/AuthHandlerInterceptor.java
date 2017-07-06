package com.ztw.admin.interceptor;

import com.ztw.admin.model.User;
import com.ztw.admin.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * admin 权限拦截器
 *
 * @author 马旭
 * @created 2017-07-06 10:20.
 */
public class AuthHandlerInterceptor extends HandlerInterceptorAdapter {

    @Autowired
    private UserRepository userRepository;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        User loginUser = userRepository.findOne(request.getParameter("userId"));

        if(loginUser.isAdmin()) {
            response.sendError(response.SC_UNAUTHORIZED, "登陆用户没有此操作权限！");
            return false;
        }

        return super.preHandle(request, response, handler);
    }
}
