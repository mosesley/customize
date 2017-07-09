package com.ztw.admin.repository;

import com.ztw.admin.model.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

/**
 * ${DESCRIPTION}
 *
 * @author 马旭
 * @created 2017-05-25 14:34.
 */
//@RepositoryRestResource(path = "/admin/menus")
public interface MenuRepository extends JpaRepository<Menu, String> {

//    @PreAuthorize("hasRole('ADMIN')")
//    @Override
//    List<Menu> findAll();
}
