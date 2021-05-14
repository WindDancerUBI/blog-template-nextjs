<p>
  <a href="https://nodejs.org/en/about/releases/"><img src="https://img.shields.io/badge/node-%3E=10.0.0-green.svg" alt="node compatility"></a>
</p>

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

```
├── mock                     # 开发和预览模式下的模拟接口
├── public
│   └── favicon.png          # Favicon
├── scripts                  # 启动项目脚本
├── src
│   ├── components           # 业务通用组件
│   ├── components-page      # 每个页面的内容组件
│   ├── config               # 项目中的配置
│   ├── layout               # 通用布局
│   ├── pages                # next路由目录
│   ├── pages                # 业务页面入口和常用模板
│   ├── redux                # redux相关
│   ├── styles               # 全局样式
│   ├── ├── pages            # 路由页面的样式
│   └──  utils               # 工具库
├── README.md
├── next.config.js           # next配置文件
└── package.json
```

## 接口说明

开发模式及预览模式接口设置为本地模拟，后端联调只需开始`scripts -> run.js`中注释的`接口请求代理`

## 注意事项

### 依赖项注意

1. `next`默认 10.0.5 版本，目前升级到更新版本，会导致 node_modules 中没有 webpack 项，会导致更多的错误。
2. `less.min.js`默认 2.7.3 版本，更新的版本在客户端运行会报错。

以上均可自行尝试踩坑！

### 开发注意

1. pages 目录下的每一个文件 next 均会生成一个路由，无论是样式文件，还是 md 文件，所以除了必须的内容组件，其他均移除该目录，例如：样式文件移动到 styles 中的 pages 中，子内容组件移动到 components-page 中。
2. 每在 pages 下添加一个新的路由目录，都需要在`run.js`中添加相应的路由代码：

```js
server.get('/about', (req, res) => {
  handle(req, res);
});
```

3. 开发模式下，存在切换路由样式未加载情况，目前没有深究问题来源，此问题不会影响生产环境。
4. 如果非常重视 seo，就尽量移除全局的加载等待（国内的搜索引擎都很笨，基本不用理会，目前发现谷歌控制台在分析网页移动端可访问性时，会出现样式未加载完成的情况，需要的可以注意一下）。

### 发布注意项

release.sh 和 bash.sh 脚本提供了一个手动的自动化发布流程（暂未提交）。

1. 项目遵循让更专业的人做更专业的事，所以只在预览和开发的时候转发**接口**、**.next 下的静态资源**和**public 下的文件**，在发布时，务必记得配置相应的 nginx 代理，例如：

```
# 代理/api的请求
location /api {
  proxy_pass   http://xxx.xxx.xxx.xxx:xxxx/api;
  proxy_set_header Host $http_host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
}

location ^~ /_next/ {
  alias /project/blog-template-next/.next/;
  if ($request_filename ~* sw.js){
          expires -1s;
      }
  expires 10m;
}

location ^~ /static/ {
  alias /project/blog-template-next/public/static/;
  if ($request_filename ~* sw.js){
          expires -1s;
      }
  expires 10m;
}
```
