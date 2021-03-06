package com.ztw.admin.basic.repository;

import com.ztw.admin.basic.model.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * ${DESCRIPTION}
 *
 * @author 马旭
 * @created 2017-05-25 14:34.
 */
@Repository("menuRepository")
public interface MenuRepository extends JpaRepository<Menu, String> {

    @Query("select distinct m from Menu m where m.path is null order by m.orderNum asc")
    @Override
    List<Menu> findAll();
//
//    @Query("select distinct m from Menu m left join fetch m.subMenu s left join fetch s.subMenu ss " +
//            "where m.path is null and s.orderNum=1 and ss.orderNum=1")
//    List<Menu> findByUser();

}
