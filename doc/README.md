# 工具后台服务

### 配置线上数据库
！ 先把 mysql/bf-min-game-plats-prod.sql 执行了。 

修改 config/config.prod.js 配置文件 填入对应的数据库

### 修改资源服务地址

修改 config/config.prod.js 配置文件 

"baseUrl": "http://47.100.202.222:3030",  填入对应的地址

### 启动端口修改

修改 config/config.prod.js 配置文件 

```
 "setting": {
  "port": 3009,      //启动服务端口
  "wsPort": 3306     //这个暂时没用到，可以随意
},
```

### 第一次启动 
因为安装所需要的环境 请执行 first_start.sh

### 更新启动 & 重重启 
执行 restart_prod.sh

### 停止服务
执行 stop.sh

### 错误日志检查
1. 启动失败 查看 mp2_err.log 
2. 服务不正常 查看 logs/err.log