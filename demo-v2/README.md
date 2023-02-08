# demo-v2

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### 接口文档地址
本次项目使用在线接口文档，接口地址如下：
[https://www.showdoc.com.cn/jinducasey/8321036098744323]
访问密码是jinduVIP

默认登录的用户名为admin,密码为JDvip@666，或是符合登录接口验证规则的用户名及密码

### 资源
分数地图资源：[http://192.144.199.210:8080/editor/index.html?chart_id=7Ph0yZtNoJ1JhGDl]

### Nginx部署项目
1、yarn build打包Vue项目
2、打开nging.conf文件,配置对应的信息
```
# nginx.conf
location / {
    root   C:\Users\17542\Desktop\project-v2\dist;
    index  index.html index.htm;
    try_files $uri $uri/ @router; # 解决页面刷新404问题
}

location @router {
    rewrite ^.*$ /index.html last; # Vue项目路由不是真实存在的
}
```
3、检查配置文件是否配置成功
```cmd
nginx -t -c D:\nginx-1.16.1\conf\nginx.conf
start nginx # 运行nginx
```

### 重点
1. 分页封装
2. axios
3. 页面搭建
