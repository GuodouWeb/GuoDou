# guodou

## 启动指令

    npm install         根据目录中package.json下载相关的依赖包

    npm run serve       启动一个前端页面

    npm run build       打包成原生html、css、js代码

    npm run analyzer    提供文件大小等可视化页面

    npm run lint        用于修复错误的配置

## 目录结构

    根目录
    │   README.md            # 说明文档
    │   dist                 # 编译原生代码(html,js,css)
    │
    ├─public                 # 不被webpack打包,作用参考官网文档
    │   │ favicon.ico           # 网页左上角图标 
    │   └─index.html            # 唯一入口页面
    │
    │
    ├─src
    │   ├─assets             # 纯静态资源(考虑移除)
    │   ├─components         # 组件存放目录(.vue)
    │   │   │
    │   │   ├─Editor            # 编辑器组件
    │   │   ├─NacigationBar     # 工具栏组件
    │   │   └─PostMan           # PostMan组件
    │   │
    │   │─consts 
    │   │   │
    │   │   └─config.js      # 应用配置（如后端ip地址）
    │   │
    │   ├─hooks              # 存放注入生命周期/返回响应式数据的函数
    │   │
    │   ├─router             # 路由配置
    │   │
    │   │─services           # 后端接口请求脚本存放地址
    │   │
    │   │
    │   ├─static             # 静态资源文件,webpack打包
    │   │   │
    │   │   ├─css               # 静态css
    │   │   ├─img               # 静态图片资源
    │   │   └─js                # 静态js
    │   │      │ 
    │   │      ├─CheckVale         # 提供正则匹配 
    │   │      ├─Login             # 存放登录js
    │   │      └─......            # .....
    │   │  
    │   ├─store              # vuex
    │   ├─views              # 各主页面 
    │   ├─App.vue            # vc组件
    │   └─main.js            # 入口文件,挂载app
    │   
    └─.....                  # 其他配置项

## 项目一些注意事项

### 命名规则

    1. 变量名： 小驼峰，禁止数字开头，允许下划线(forExample)
    2. 普通函数： 小驼峰，禁止数字开头，允许下划线(forExample)
    3. 构造函数、类： 大驼峰(ForExample)

### js拆分原则

    1. 总原则： 
        - 拆到保持vue文件可读性较高为止，避免过度拆分
        - 采用index.js引入，增加导入时的可读性
        - 考虑复用性，例如正则可以专门归类到CheckValue文件下
        - 一级文件夹名称用大驼峰，二级暂定小写
        - 获取数据或定义数据的脚本应与实际业务脚本分离
    1. hooks： 带生命周期、返回响应式数据的，存放到此
    2. /static/js： 普通的js代码，存放到此

### 注释规则

    1. 较为复杂的代码，需要有注释
    2. 在vue.congif.js新增插件时，需要添加对应的注释
