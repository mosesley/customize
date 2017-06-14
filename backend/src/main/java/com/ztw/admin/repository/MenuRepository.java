package com.ztw.admin.repository;

import com.ztw.admin.model.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * ${DESCRIPTION}
 *
 * @author 马旭
 * @created 2017-05-25 14:34.
 */
public interface MenuRepository extends JpaRepository<Menu, Integer> {

    @Query("select distinct m from Menu m where m.path is null")
    @Override
    List<Menu> findAll();

    @Query("select distinct m from Menu m left join fetch m.subMenu s left join fetch s.subMenu ss " +
            "where m.path is null and s.orderNum=1 and ss.orderNum=1")
    List<Menu> findByUser();
}
