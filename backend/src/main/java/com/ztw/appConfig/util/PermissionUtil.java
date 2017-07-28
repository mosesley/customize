package com.ztw.appConfig.util;

import com.ztw.admin.basic.annotations.AuthPermission;
import com.ztw.admin.basic.model.Permission;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.core.type.AnnotationMetadata;
import org.springframework.core.type.ClassMetadata;
import org.springframework.core.type.MethodMetadata;
import org.springframework.core.type.classreading.CachingMetadataReaderFactory;
import org.springframework.core.type.classreading.MetadataReader;
import org.springframework.core.type.classreading.MetadataReaderFactory;

import java.io.IOException;
import java.util.*;

/**
 * 通过AuthPermission annotation自动生成系统权限资源
 *
 * @author 马旭
 * @created 2017-07-19 13:52.
 */
public class PermissionUtil {
    // 创建ResourcePatternResolver资源对象
    private static ResourcePatternResolver rpr = new PathMatchingResourcePatternResolver();

    // 创建MetadataReaderFactory来获取元数据
    private static MetadataReaderFactory mrf = new CachingMetadataReaderFactory();

    /**
     * 生成系统后台菜单
     * @param path
     */
    public static List<Permission> buildAppPermision(String path) {
        List<Permission> rootPermissions = new ArrayList<>();
        try {
            // 遍历资源
            for(Resource res: rpr.getResources(path)) {
                MetadataReader mr = mrf.getMetadataReader(res);
                AnnotationMetadata am = mr.getAnnotationMetadata();
                ClassMetadata cm = mr.getClassMetadata();

                /**
                 * 先创建根资源，资源必须是Controller
                 */
                if(am.hasAnnotation(AuthPermission.class.getName()) && cm.getClassName().matches(".*Controller")) {
                    Permission rootPermission = new Permission();
                    Map<String, Object> amAuthPermission = am.getAnnotationAttributes(AuthPermission.class.getName());

                    rootPermission.setName((String) amAuthPermission.get("name"));
                    rootPermission.setMethod((String) amAuthPermission.get("method"));
                    rootPermission.setUrl((String) amAuthPermission.get("url"));

                    /**
                     * 子资源创建
                     */
                    buildSubPermission(rootPermission, am);

                    rootPermissions.add(rootPermission);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return rootPermissions;
    }

    /**
     * 创建子资源，子资源是controller类的方法
     */
    private static void buildSubPermission(Permission rootPermission, AnnotationMetadata am) {
        // 遍历资源
        Set<MethodMetadata> mms = am.getAnnotatedMethods(AuthPermission.class.getName());
        Set<Permission> methodPers = new HashSet<>();
        for (MethodMetadata mm: mms) {
            Permission methodPer = new Permission();
            Map<String, Object> mmAuthPer = mm.getAnnotationAttributes(AuthPermission.class.getName());

            methodPer.setName((String) mmAuthPer.get("name"));
            methodPer.setMethod((String) mmAuthPer.get("method"));
            methodPer.setUrl(rootPermission.getUrl() + mmAuthPer.get("url"));

            methodPers.add(methodPer);
        }
        rootPermission.setSubPer(methodPers);
    }
}
