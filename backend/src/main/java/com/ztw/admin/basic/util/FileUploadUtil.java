package com.ztw.admin.basic.util;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.UUID;

/**
 * 文件处理
 * @Author 马旭
 * @Date 2017/8/10-16:09
 */
public class FileUploadUtil {
    // 文件信息
    public static final String REAL_NAME = "realName"; // 真实名称
    public static final String STORE_NAME = "storeName"; // 存储名称
    public static final String SIZE = "size"; // 文件大小
    public static final String ERROR = "error"; // 错误信息

    /**
     * 文件上传(单文件上传)
     *
     * @throws IOException
     * @throws IllegalStateException
     */
    public static Map<String, Object> fileUpload(MultipartFile file, String uploadDir)
            throws IllegalStateException, IOException {
        Map<String, Object> fileInfo = new HashMap<>();
        if (!new File(uploadDir).exists()) { // 如果目录不存在，创建一个目录
            File dir = new File(uploadDir);
            dir.mkdirs();
        }
        if (!file.isEmpty()) {
            // 限制文件最大为10MB //10MB*1024*1024=10485760
            if (file.getSize() > 10485760) {
                fileInfo.put(FileUploadUtil.ERROR, "文件大于10M上传失败");
                return fileInfo;
            }
            String realName = file.getOriginalFilename(); // 获取原文件名
            String storeName = FileUploadUtil.rename(realName); // 文件存储名称
            fileInfo.put(FileUploadUtil.REAL_NAME, realName);
            fileInfo.put(FileUploadUtil.STORE_NAME, storeName);
            fileInfo.put(FileUploadUtil.SIZE, file.getSize());

            File outFile = new File(uploadDir + File.separator + storeName);// 路径加文件名
            file.transferTo(outFile); // 保存文件
        } else {
            fileInfo.put(FileUploadUtil.ERROR, "文件为空");
        }
        return fileInfo;
    }

    /**
     * 删除文件(单个文件)
     */
    public static void deleteFile(String fileName, String deleteDir) {
        File delFile = new File(deleteDir + File.separator + fileName);
        if(delFile.exists()) {
            delFile.delete();
        }
    }

    /**
     * 更改文件名称
     */
    public static String rename(String fileName) {
        final Random rd = new Random();
        final Long random = rd.nextLong();
        String num = String.valueOf(random);
        // 限制5个字符
        int limit = 5;
        if (num.length() > limit) {
            num = num.substring(0, limit);
        }
        // uuid生成文件名
        UUID uuid = UUID.randomUUID();
        // 加上 5位随机数
        String uustr = uuid.toString() + num;
        if (fileName.indexOf(".") != -1) {
            uustr += fileName.substring(fileName.lastIndexOf("."));
        } else {
            return uustr;
        }
        return uustr;
    }
}
