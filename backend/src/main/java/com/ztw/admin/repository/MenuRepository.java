package com.ztw.admin.repository;

import com.ztw.admin.model.Menu;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * ${DESCRIPTION}
 *
 * @author 马旭
 * @created 2017-05-25 14:34.
 */
public interface MenuRepository extends JpaRepository<Menu, Integer> {

    List<Menu> findByPathOrderByOrderNumAsc(String path);
}
