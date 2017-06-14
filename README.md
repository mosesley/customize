# angular2，spring-boot综合项目demo（还在开发中）
  使用idea作为开发工具
## 用到的技术
### 前端
* node (v6.10.1)
* npm (v5.0.3)
* angular2 (v4.2以上版本)
* angular-cli (用来构建前端项目)
* sass
* typescript (开发语言)
* bootstrap (v4.0.0-alpha.6)
* font-awesome (v4.7.0)

  ...

### 后端
* java (v8)
* spring-boot（v1.5.3）
* gradle (项目构建工具)
* MySQL 数据据

  ...

## 环境搭建
  需要安装java，node，gradle，idea，mysql... 安装方法这里不说了，说一下安装时的一些细节。
  ### gradle
  解压后把bin目录加入环境变量，新建GRADLE_USER_HOME的变量用来设置java依赖包的存放位置

  ![gradle_user_home](./readme/gradle_user_home.png)

  同时idea需要对gradle进行设置

   ![gradle_user_home](./readme/idea_gradle_setting.png)

   ### node
  node安装完事后用如下命令更新一下npm

  <code>npm install npm -g</code>

  使用以下命令设置缓存和全局包安装地址,地址写自己的地址，这里只是参考

  <code>
  npm config set prefix D:\ProgramFiles\nodejs\node_global

  npm config set cache D:\ProgramFiles\nodejs\node_cache
  </code>


## 项目运行
后端项目用idea载入后一般会自动加载依赖包，使用idea自带的命令行工具启动项目

    命令：gradle bootRun

前端项目用idea载入后需要先安装依赖包,需要注意的是全局@angular/cli和本地@angular/cli版本必须一致

    全局安装@angular/cli: npm install @angular/cli -g

    安装项目依赖包: npm install

    项目运行：ng serve --proxy-config proxy.conf.json

## 项目运行后从4200端口打开，效果下图：
  ### 项目初始化
  ![app-init](./readme/app-init.png)

  ### 后台登陆
  ![Admin-login](./readme/admin-login.png)

  ### 后台示例页面
  ![Admin-user](./readme/admin-user.png)

  后台页面参考[ng2-admin](https://github.com/akveo/ng2-admin) 项目
