package com.ztw.admin.goods.controller;

import com.ztw.admin.basic.annotations.AuthPermission;
import com.ztw.admin.basic.annotations.AutoMenu;
import com.ztw.admin.basic.util.FileUploadUtil;
import com.ztw.admin.goods.model.Goods;
import com.ztw.admin.goods.model.GoodsDto;
import com.ztw.admin.goods.service.GoodsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Map;

/**
 * @Author 马旭
 * @Date 2017/8/1-9:44
 */
@RestController
@RequestMapping(value = "/admin/goods")
@AutoMenu(name = "商品", icon = "store", orderNum = 2)
@AuthPermission(name = "商品", url = "/admin/goods")
public class GoodsController extends GoodsRootMenu{

    @Autowired
    private GoodsService goodsService;

    @GetMapping(value = "/list")
    @AutoMenu(name = "商品列表", orderNum = 1)
    @AuthPermission(name = "商品列表", url = "/list", method = "GET")
    public Page<GoodsDto> list(@RequestParam("sort") String sort, @RequestParam("order") String order,
                               @RequestParam("page") Integer page, @RequestParam("pageSize") Integer pageSize) {
        Sort.Direction sort_order;
        if(order.equals("asc")) {
            sort_order = Sort.Direction.ASC;
        } else {
            sort_order = Sort.Direction.DESC;
        }
        Pageable pageable = new PageRequest(page, pageSize, new Sort(sort_order , sort));
        return goodsService.findAll(pageable);
    }

    @PostMapping(value = "/add")
    @AuthPermission(name = "商品添加", url = "/add", method = "POST")
    @Transactional
    public Goods add(Goods goods, HttpServletRequest request,
                     @RequestParam("showImg") MultipartFile showImg,
                     @RequestParam("dz1Img") MultipartFile dz1Img,
                     @RequestParam("dz2Img") MultipartFile dz2Img) throws IOException {
        // 文件保存路径
        String uploadDir = request.getSession().getServletContext().getRealPath("/resources/goods/" + goods.getTitle());
        System.out.println(uploadDir);

        // 文件保存
        Map<String, Object> showImgFileInfo = FileUploadUtil.fileUpload(showImg, uploadDir);
        if (showImgFileInfo.get(FileUploadUtil.ERROR) != null) {
            System.out.println(showImgFileInfo.get(FileUploadUtil.ERROR));
        } else {
            goods.setShowImgUrl((String) showImgFileInfo.get(FileUploadUtil.STORE_NAME));
        }

        Map<String, Object> dz1ImgFileInfo = FileUploadUtil.fileUpload(dz1Img, uploadDir);
        Map<String, Object> dz2ImgFileInfo = FileUploadUtil.fileUpload(dz2Img, uploadDir);
        if (dz1ImgFileInfo.get(FileUploadUtil.ERROR) != null || dz2ImgFileInfo.get(FileUploadUtil.ERROR) != null) {
            System.out.println(dz1ImgFileInfo.get(FileUploadUtil.ERROR));
            System.out.println(dz2ImgFileInfo.get(FileUploadUtil.ERROR));
        } else {
            goods.setDzImgUrls(new String[]{(String) dz1ImgFileInfo.get(FileUploadUtil.STORE_NAME), (String) dz2ImgFileInfo.get(FileUploadUtil.STORE_NAME)});
        }

        System.out.println(goods.toString());
        return goodsService.add(goods);
    }

}
