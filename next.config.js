/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs');
const withPlugins = require('next-compose-plugins');
const withLess = require('@zeit/next-less');
const withCss = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 环境
const isDev = process.env.NODE_ENV === 'development';

// 如果只需要使用某一种主题
// const { getThemeVariables } = require('antd/dist/theme');

// lessLoaderOptions添加：
// modifyVars: getThemeVariables({
// dark: true,
// })

const AntDesignThemePlugin = require('antd-theme-webpack-plugin');
const { getLessVars } = require('antd-theme-generator');

const themeVariables = getLessVars(path.join(__dirname, './src/styles/vars.less'));
// const defaultVars = getLessVars('./node_modules/antd/lib/style/themes/default.less');
const darkVars = {
  ...getLessVars('./node_modules/antd/lib/style/themes/dark.less'),
  // '@primary-color': defaultVars['@primary-color'],
  '@picker-basic-cell-active-with-range-color': 'darken(@primary-color, 20%)'
};
const lightVars = {
  ...getLessVars('./node_modules/antd/lib/style/themes/compact.less')
  // '@primary-color': defaultVars['@primary-color']
};
fs.writeFileSync('./src/config/dark.json', JSON.stringify(darkVars));
fs.writeFileSync('./src/config/light.json', JSON.stringify(lightVars));
fs.writeFileSync('./src/config/theme.json', JSON.stringify(themeVariables));

const themeOptions = {
  stylesDir: path.join(__dirname, './src'),
  antDir: path.join(__dirname, './node_modules/antd'),
  varFile: path.join(__dirname, './src/styles/vars.less'),
  themeVariables: Array.from(
    new Set([
      ...Object.keys(darkVars),
      ...Object.keys(lightVars),
      ...Object.keys(themeVariables)
    ])
  ),
  indexFileName: false,
  outputFilePath: path.join(__dirname, './public/color.less'),
  generateOnce: false
};

module.exports = withPlugins([withCss, withLess, withSass], {
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: isDev ? '[local]___[hash:base64:5]' : '[hash:base64:13]'
  },
  lessLoaderOptions: {
    javascriptEnabled: true,
    importLoaders: 1
  },
  webpack: (config, options) => {
    const { isServer } = options;

    // 忽略mini-css的warn，antd组件引入顺序不同会提示Conflicting order between xxx
    for (let i = 0; i < config.plugins.length; i++) {
      const p = config.plugins[i];
      if (!!p.constructor && p.constructor.name === MiniCssExtractPlugin.name) {
        const miniCssExtractOptions = { ...p.options, ignoreOrder: true };
        config.plugins[i] = new MiniCssExtractPlugin(miniCssExtractOptions);
        break;
      }
    }

    // 添加主题切换webpack插件
    config.plugins.push(new AntDesignThemePlugin(themeOptions));

    // ====修改默认的less\sass loader规则====
    const rules = config.module.rules;
    let ruleLess = null;
    let ruleSass = null;

    rules.forEach((ruleItem) => {
      const ruleTestStr = ruleItem.test && ruleItem.test.toString();

      switch (ruleTestStr) {
        case '/\\.scss$/': {
          ruleSass = ruleItem;
          break;
        }
        case '/\\.less$/': {
          ruleLess = ruleItem;
          break;
        }
      }
    });

    for (let lo = 0; lo < ruleLess.use.length; lo++) {
      const loaderOptions = ruleLess.use[lo];

      if (loaderOptions.options) {
        // 模块样式
        if (loaderOptions.options.modules) {
          // convoluted way to copy and separate rule.use[lo].options.modules
          const ruleCopy = { ...ruleLess, exclude: /\.module\.css$/ };
          ruleCopy.use = [...ruleLess.use];
          ruleCopy.use[lo] = { ...loaderOptions };
          ruleCopy.use[lo].options = {
            ...loaderOptions.options,
            modules: false
          };
          rules.push(ruleCopy);
          ruleLess.test = /\.module\.css$/;
        }
      } else if (typeof loaderOptions === 'string' || loaderOptions instanceof String) {
        // not enabling CSS modules
      } else {
        console.log(`next.config.js\tcan't tell is loaderOptions is enabling CSS module`);
      }
    }

    for (let lo = 0; lo < ruleSass.use.length; lo++) {
      const loaderOptions = ruleSass.use[lo];
      if (loaderOptions.options) {
        if (loaderOptions.options.modules) {
          // convoluted way to copy and separate rule.use[lo].options.modules
          const ruleCopy = { ...ruleSass, exclude: /\.module\.scss$/ };
          ruleCopy.use = [...ruleSass.use];
          ruleCopy.use[lo] = { ...loaderOptions };
          ruleCopy.use[lo].options = {
            ...loaderOptions.options,
            modules: false
          };
          rules.push(ruleCopy);
          ruleSass.test = /\.module\.scss$/;
        }
      } else if (typeof loaderOptions === 'string' || loaderOptions instanceof String) {
        // not enabling CSS modules
      } else {
        console.log(`next.config.js\tcan't tell is loaderOptions is enabling CSS module`);
      }
    }

    // 支持antd
    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/;
      const origExternals = [...config.externals];
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) {
            return callback();
          }
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback);
          } else {
            callback();
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals)
      ];

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader'
      });
    }

    config.resolve.alias['@'] = path.resolve(__dirname, './src');
    config.resolve.alias['@cps'] = path.resolve(__dirname, './src/components');

    return config;
  }
});
