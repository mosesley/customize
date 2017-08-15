package com.ztw.admin.goods.service;

import com.ztw.admin.basic.util.FileUploadUtil;
import com.ztw.admin.goods.model.Goods;
import com.ztw.admin.goods.model.GoodsDto;
import com.ztw.admin.goods.repository.CategoryRepository;
import com.ztw.admin.goods.repository.GoodsCategoryRepository;
import com.ztw.admin.goods.repository.GoodsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.File;

/**
 * @Author 马旭
 * @Date 2017/8/1-14:08
 */
@Service(value = "goodsService")
public class GoodsServiceImpl implements GoodsService {

    @Autowired
    private GoodsRepository goodsRepository;

    @Autowired
    private GoodsCategoryRepository goodsCategoryRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Page<GoodsDto> findAll(Pageable pageable) {
        Page<Goods> goodsPage = goodsRepository.findAll(pageable);
        Page<GoodsDto> goodsDtos = goodsPage.map(
                source ->
                        new GoodsDto(source, null)
        );

        return goodsDtos;
    }

    @Override
    public Goods add(Goods goods) {
        Goods g = goodsRepository.findByTitle(goods.getTitle());
        if( g != null ) {
            throw new RuntimeException("添加的商品标题已经被使用");
        }
        return goodsRepository.save(goods);
    }

    @Override
    public void delete(String id, String uploadDir) {
        goodsRepository.delete(id);
        goodsCategoryRepository.deleteByGoodsId(id);
        FileUploadUtil.deleteDir(new File(uploadDir + id));
    }

    @Override
    public GoodsDto update(GoodsDto goodsDto) {
        return null;
    }
}
