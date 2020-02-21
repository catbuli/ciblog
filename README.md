# CIblog（更新中暂时无法正常使用）
基于tp5和vue.js（2.6.10）开发的博客平台

#技术栈
前端：vue2+vuex+vue-router+webpack+ES6/7+element-ui
后端：tp5

#主要功能
- [-] 前台
    - [x] 侧边导航栏
    - [x] banner随机轮换
    - [x] 查看文章
    - [x] 文章搜索
    - [x] 分类搜索
    - [x] 标签搜索
    - [x] 列表分页
    - [x] 文章评论
    - [x] 过渡动画  
    - [x] 返回顶部
    - [x] 表单验证
    - [ ] 文章回复
    - [ ] 选择头像
- [-] 后台
    - [x] 导航栏
    - [x] 管理员登陆注销
    - [x] 管理员登陆失效检测
    - [x] 总览
        - [x] 数据统计
        - [x] 最新文章
        - [x] 最新评论
    - [-] 个人设置
        - [x] 基本设置
        - [x] 管理员密码修改
        - [ ] 表单验证
    - [-] 写文章
        - [x] markdown编辑器
        - [x] 文章基本信息填写
        - [x] 文件上传
        - [ ] 表单验证
        - [ ] 保存草稿
    - [-] 文章管理
        - [x] 删除
        - [x] 编辑
        - [ ] 筛选
    - [-] 分类管理
        - [x] 删除
        - [x] 添加
        - [ ] 编辑
        - [ ] 筛选
    - [-] 标签管理
        - [x] 删除
        - [x] 添加
        - [x] 添加
        - [ ] 筛选
    - [-] 文件管理
        - [x] 删除
        - [x] 图片预览
        - [ ] 筛选
    - [-] 评论管理
        - [x] 删除
        - [x] 审核
        - [ ] 筛选
        - [ ] 回复
        - [ ] 编辑
    - [-] 系统设置
        - [x] banner轮换设置
        - [ ] 待完善
    - [-] 阅读设置
        - [ ] 待完善
    - [-] 评论设置
        - [ ] 待完善


#项目运行

`git clone https://github.com/zhangyifei233/CIblog.git`

`cd ciblog/blog`

`npm install`

`npm run serve`

#效果演示

新域名还在备案

#项目结构（暂时）


├─api
│  ├─application
│  │  ├─common                      //工具
│  │  ├─extra
│  │  └─index
│  │      ├─controller              //控制器
│  │      └─model                   //模型
│  └─public
│     ├─static
│     └─uploads                     //文件上传位置
└─blog
    ├─public
    └─src
        ├─assets                    //资源文件夹
        ├─commonFunction            //以后可能会删掉
        ├─components                //组件
        │  ├─admin                  
        │  │  └─common              
        │  ├─common                 
        │  ├─footer                 
        │  ├─header                 
        │  ├─menu                   
        │  ├─miniTools              
        │  └─nav
        ├─http                      //封装axios请求
        ├─mock
        ├─router                    //路由
        ├─store                     //vuex
        │  └─components
        └─views                     //页面

