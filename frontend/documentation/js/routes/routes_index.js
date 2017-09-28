var ROUTES_INDEX = {"name":"<root>","kind":"module","className":"AppModule","children":[{"name":"appRoutes","filename":"src/app/app-routing.module.ts","module":"AppRoutingModule","children":[{"path":"","redirectTo":"/index","pathMatch":"full"},{"path":"init","loadChildren":"app/app-init/app-init.module#AppInitModule","children":[{"kind":"module","children":[{"name":"appInitRoutes","filename":"src/app/app-init/app-init-routing.module.ts","module":"AppInitRoutingModule","children":[{"path":"","component":"AppInitComponent","canActivate":["AppInitGuard"]}],"kind":"module"}],"module":"AppInitModule"}]},{"path":"admin","loadChildren":"app/admin/admin.module#AdminModule","children":[{"kind":"module","children":[{"name":"adminRoutes","filename":"src/app/admin/admin-routing.module.ts","module":"AdminRoutingModule","children":[{"path":"login","loadChildren":"app/admin/login/login.module#LoginModule","children":[{"kind":"module","children":[{"name":"loginRoutes","filename":"src/app/admin/login/login-routing.module.ts","module":"LoginRoutingModule","children":[{"path":"","component":"LoginComponent"}],"kind":"module"}],"module":"LoginModule"}]},{"path":"","component":"AdminComponent","canActivate":["AdminGuard"],"children":[{"path":"","redirectTo":"index","pathMatch":"full"},{"path":"index","loadChildren":"app/admin/main-content/index/index.module#IndexModule","children":[{"kind":"module","children":[{"name":"indexRoutes","filename":"src/app/index/index-routing.module.ts","module":"IndexRoutingModule","children":[{"path":"","component":"IndexComponent"}],"kind":"module"}],"module":"IndexModule"}]},{"path":"user","loadChildren":"app/admin/main-content/user/user.module#UserModule","children":[{"kind":"module","children":[{"name":"userRoutes","filename":"src/app/admin/main-content/user/user-routing.module.ts","module":"UserRoutingModule","children":[{"path":"","component":"UserComponent","children":[{"path":"","redirectTo":"list","pathMatch":"full"},{"path":"list","component":"UserListComponent"}]}],"kind":"module"}],"module":"UserModule"}]},{"path":"role","loadChildren":"app/admin/main-content/role/role.module#RoleModule","children":[{"kind":"module","children":[{"name":"roleRoutes","filename":"src/app/admin/main-content/role/role-routing.module.ts","module":"RoleRoutingModule","children":[{"path":"","component":"RoleComponent","children":[{"path":"","redirectTo":"list","pathMatch":"full"},{"path":"list","component":"RoleListComponent"}]}],"kind":"module"}],"module":"RoleModule"}]},{"path":"appConfig","loadChildren":"app/admin/main-content/appConfig/app-config.module#AppConfigModule","children":[{"kind":"module","children":[{"name":"appConfigRoutes","filename":"src/app/admin/main-content/appConfig/app-config-routing.module.ts","module":"AppConfigRoutingModule","children":[{"path":"","component":"AppConfigComponent"}],"kind":"module"}],"module":"AppConfigModule"}]},{"path":"goods","loadChildren":"app/admin/main-content/goods/goods.module#GoodsModule","children":[{"kind":"module","children":[{"name":"goodsRoutes","filename":"src/app/admin/main-content/goods/goods-routing.module.ts","module":"GoodsRoutingModule","children":[{"path":"","component":"GoodsComponent","children":[{"path":"list","component":"GoodsListComponent"},{"path":"add","component":"GoodsAddComponent"},{"path":"category/list","component":"CategoryComponent"}]}],"kind":"module"}],"module":"GoodsModule"}]}]}],"kind":"module"}],"module":"AdminModule"}]},{"path":"index","loadChildren":"app/index/index.module#IndexModule","children":[{"kind":"module","children":[],"module":"IndexModule"}]},{"path":"**","component":"PageNotFoundComponent"}],"kind":"module"}]}
