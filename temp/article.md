不能不说，写这个的时候，真的好饿！

> **描述**：在 nextjs 中对 antd 的亮白和暗黑主题切换实践。<br>**在线预览**：[https://zhoubangfu.com/demo/theme](https://zhoubangfu.com/demo/theme) 18:00-7:00 是暗黑主题，可以通过 Redux DevTools 提交 action, `{type: 'change_theme',value: 'dark/light'}`来切换，或者在预览页面的下拉菜单切换也可以。<br> **代码仓库**：[https://github.com/zhoubangfu/nextjs-start](https://github.com/zhoubangfu/nextjs-start)

## 预览图

![0507213036.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9a8cd8e5949a4f4ca013b4671e3b7fad~tplv-k3u1fbpfcp-watermark.image)

![0507213210.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b39bf7f7ccec4b6586448363eef619ac~tplv-k3u1fbpfcp-watermark.image)

主要用到一个 webpack 插件`antd-theme-webpack-plugin`。下面会一步一步的造~

> 这个插件是基于使用 webpack 环境的，暂时没有去看有没有大佬有开发支持 vite 的插件。在支持服务端渲染的项目中有了实践，那么在单页应用客户端渲染的项目中，就大同小异了。

## 搭建项目

其中添加 redux、舍弃 nextjs 自身的 css 使用 withCss 插件、添加 less\sass 以及支持模块样式的内容就不谈了，内容很简单，可以直接看代码。

### 添加主题依赖

### 配置项

1.添加自定义的主题

向 styles 文件夹中添加 vars.less，内容可以像下面：

这部分即使最主要的配置内容，后面将开始使用该配置生成的内容了

3.添加切换主题内容

由于 nextjs 中是没有 html 文件的，所以我们不能像 Nextjs 的 demo 一样直接添加标签引入内容，但是可以稍微变通一下。

这里选择在 pages 下的\_app.tsx 动态添加该内容

> 注意：如果像[https://github.com/zhoubangfu/nextjs-start](https://github.com/zhoubangfu/nextjs-start)中的源码一样，使用了 redux 或 mobx 之类的跨组件状态管理的话，在 Provider 所在主题可能不能很好的提交 action，可以选择在更深层的公共组件中完成，比如 Layout 中。

\_app.tsx

```js
import { useEffect } from 'react';

// 开发阶段导入json，共线上环境直接使用
import darkVars from '../config/dark.json';
import lightVars from '../config/light.json';
// import themeVars from '../config/theme.json';

const Layout = ({ Component, pageProps }) => {
  useEffect(() => {
    window['less'] = {
      async: true,
      env: 'production'
    };

    const script = document.createElement('script');

    // 等到less加载完成后执行，免得报错
    script.addEventListener('load', () => {
      window['less']
        .modifyVars(config.name === 'light' ? lightVars : darkVars)
        .catch((error) => {
          console.error(error);
        });
    });

    // 重点，高于2.7.3版本的less在浏览器端运行会抛错，可以自己踩踩看
    script.src = 'https://cdn.bootcdn.net/ajax/libs/less.js/2.7.3/less.min.js';
    document.body.appendChild(script);

    const css = document.createElement('link');
    css.href = '/color.less';
    css.rel = 'stylesheet/less';
    css.type = 'text/css';
    document.body.appendChild(css);
  }, []);

  return <Component {...pageProps} />;
};

export default Layout;
```

从代码中可以看出来，实际上切换主题只是运行了`window.less.modifyVars`，所以我们只需要将切换主题的下拉框选择时间与其绑定即可

4.在 sass 中适配

less 的变量不要想着直接拿到 sass 中直接使用（也许有办法），我在博客中采用的方法是最简单的皮肤切换方式：修改外部 className，新增 dark 对应的样式。

如此，在调用`window.less.modifyVars`后，可以提交 redux action 修改对应的 state，然后切换外部的 class，这算得上是工作量和难度都较低的方法了。

## 写在末尾

其中的解决方案来自网络，作者只是抽时间将所学拼在了一起。主要的内容还是来自 nextjs 的 github demo 中。
