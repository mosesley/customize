package com.ztw.appConfig.util;

import com.ztw.admin.annotations.AutoMenu;
import com.ztw.admin.model.Menu;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.core.type.AnnotationMetadata;
import org.springframework.core.type.ClassMetadata;
import org.springframework.core.type.MethodMetadata;
import org.springframework.core.type.classreading.CachingMetadataReaderFactory;
import org.springframework.core.type.classreading.MetadataReader;
import org.springframework.core.type.classreading.MetadataReaderFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.IOException;
import java.util.*;

/**
 * 通过AutoMenu annotation自动生成系统后台菜单
 *
 * @author 马旭
 * @created 2017-05-23 11:24.
 */
public class MenuUtil {
    // 创建ResourcePatternResolver资源对象
    private static ResourcePatternResolver rpr = new PathMatchingResourcePatternResolver();

    // 创建MetadataReaderFactory来获取元数据
    private static MetadataReaderFactory mrf = new CachingMetadataReaderFactory();

    /**
     * 生成系统后台菜单
     * @param path
     */
    public static List<Menu>  buildAppAdminMenu(String path) {
        List<Menu> rootMenus = new ArrayList<>();

        try {
            // 遍历资源
            for(Resource res: rpr.getResources(path)) {
                MetadataReader mr = mrf.getMetadataReader(res);
                AnnotationMetadata am = mr.getAnnotationMetadata();
                ClassMetadata cm = mr.getClassMetadata();

                /**
                 * 先创建根菜单，根菜单必须必须是抽象类
                 */
                if(am.hasAnnotation(AutoMenu.class.getName()) && cm.isAbstract()) {
                    Menu rootMenu = new Menu();
                    Map<String, Object> amAutoMenu = am.getAnnotationAttributes(AutoMenu.class.getName());

//                    rootMenu.setPath("");
                    rootMenu.setName((String) amAutoMenu.get("name"));
                    rootMenu.setIcon((String) amAutoMenu.get("icon"));
                    rootMenu.setOrderNum((Integer) amAutoMenu.get("orderNum"));

                    /**
                     * 子菜单创建
                     */
                    buildSubMenu(rootMenu, path, cm.getClassName());

                    rootMenus.add(rootMenu);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return rootMenus;
    }

    /**
     * 创建子菜单，子菜单类继承父菜单类
     */
    private static void buildSubMenu(Menu rootMenu, String path, String rootClassName) {
        try {
            // 遍历资源
            List<Menu> controllerMenus = new ArrayList<>();
            for(Resource res: rpr.getResources(path)) {
                MetadataReader mr = mrf.getMetadataReader(res);
                AnnotationMetadata am = mr.getAnnotationMetadata();
                ClassMetadata cm = mr.getClassMetadata();

                /**
                 * 创建子菜单，子菜单controller继承root菜单抽象类
                 */
                if (am.hasAnnotation(AutoMenu.class.getName()) && cm.getSuperClassName().equals(rootClassName)) {
                    Menu controllerMenu = new Menu();
                    Map<String, Object> amAutoMenu = am.getAnnotationAttributes(AutoMenu.class.getName());
                    Map<String, Object> amMap = new HashMap<>();
                    if(am.isAnnotated(RequestMapping.class.getName())) {
                        amMap = am.getAnnotationAttributes(RequestMapping.class.getName());
                    } else if(am.isAnnotated(GetMapping.class.getName())) {
                        amMap = am.getAnnotationAttributes(GetMapping.class.getName());
                    } else if(am.isAnnotated(PostMapping.class.getName())) {
                        amMap = am.getAnnotationAttributes(PostMapping.class.getName());
                    }

                    controllerMenu.setPath(((String[]) amMap.get("value"))[0]);
                    controllerMenu.setName((String) amAutoMenu.get("name"));
                    controllerMenu.setIcon((String) amAutoMenu.get("icon"));
                    controllerMenu.setOrderNum((Integer) amAutoMenu.get("orderNum"));


                    /**
                     * 创建三级菜单，controller内的AutoMenu注解方法
                     */
                    Set<MethodMetadata> mms = am.getAnnotatedMethods(AutoMenu.class.getName());
                    List<Menu> methodMenus = new ArrayList<>();
                    for (MethodMetadata mm: mms) {
                        Menu methodMenu = new Menu();
                        Map<String, Object> mmAutoMenu = mm.getAnnotationAttributes(AutoMenu.class.getName());
                        Map<String, Object> mmMap = new HashMap<>();

                        if(mm.isAnnotated(RequestMapping.class.getName())) {
                            mmMap = mm.getAnnotationAttributes(RequestMapping.class.getName());
                        }

                        if(mm.isAnnotated(GetMapping.class.getName())) {
                            mmMap = mm.getAnnotationAttributes(GetMapping.class.getName());
                        }

                        if(mm.isAnnotated(PostMapping.class.getName())) {
                            mmMap = mm.getAnnotationAttributes(PostMapping.class.getName());
                        }

                        methodMenu.setPath(((String[]) mmMap.get("value"))[0]);
                        methodMenu.setName((String) mmAutoMenu.get("name"));
                        methodMenu.setIcon((String) mmAutoMenu.get("icon"));
                        methodMenu.setOrderNum((Integer) mmAutoMenu.get("orderNum"));

                        methodMenus.add(methodMenu);
                    }
                    controllerMenu.setSubMenu(methodMenus);

                    controllerMenus.add(controllerMenu);
                }
            }

            rootMenu.setSubMenu(controllerMenus);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
