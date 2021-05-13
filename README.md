# 博客模板

仅包含了前端代码，由于作者已经多年没写 Java，后端接口服务以及 cms 管理系统暂时没有提供，可以根据项目中提供的 mock 数据以及数据库结构自行搭建后端接口服务。

## 预览地址

在线预览：[传送门](https://zhoubangfu.com)

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ad7d30bc18cd47d0a2241aaab63b281b~tplv-k3u1fbpfcp-watermark.image)

## 使用说明

1. 开发启动

```shell
yarn dev
# http://127.0.0.1:3344
```

2. 预览启动

该模式下的接口仍然是项目中的 mock 接口，具体请查看**scripts -> run.js**

```shell
yarn build && yarn preview
# http://127.0.0.1:4444
```

3. 构建项目

```shell
yarn build
```

4. 生产发布

```
yarn start
```

生产环境一般需要保持一直运行着，windows server 可以注册服务或者一直开着 shell 窗口，这里讲一下 linux 下启动方式

通过安装`pm2`来保持项目一直运行着

创建任务

```shell
pm2 start npm --name bolg -- run start
```

这样就启动了一个名为 blog 的 pm2 任务。

其他的常用命令：

```shell
pm2 stop blog    # 停止
pm2 ls           # 查看列表
pm2 start blog   # 启动任务
pm2 restart blog # 重启任务
```

## 目录说明

## 接口说明

## 注意事项
