import { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import Layout from '@/layout';
import { message } from 'antd';
import config from '@/config';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import type { AppProps } from 'next/app';
import '@/styles/global.scss';
import '@/styles/myAnimate.scss';

const MyApp = ({ Component, pageProps }: AppProps): ReactElement<any> => {
  useEffect(() => {
    console.log(
      '%c最近更新：2021年05月09日19:48:42 %c| %c版本：4.2.1',
      'color: green',
      'color: gray',
      'color: orange'
    );

    let timeOut = null;

    let routerLoad: any = () => {
      //
    };

    Router.events.on('routeChangeStart', () => {
      timeOut = setTimeout(() => {
        routerLoad = message.loading('请稍后...', 0);
      }, 300);
    });

    Router.events.on('routeChangeComplete', () => {
      clearTimeout(timeOut);
      routerLoad();
    });
  }, []);

  return (
    <Provider store={store}>
      <Layout>
        <>
          <Head>
            <meta name="keywords" content={config.baseKeys} />
            {/* <link rel="shortcut icon" href="/cos/favicon.ico" type="image/x-icon" /> */}
            {
              // 搜索引擎验证根据自己的情况添加
            }
            <meta name="google-site-verification" content="xxxx" />
            <meta name="360-site-verification" content="xxx" />
            <meta name="baidu-site-verification" content="xxx" />
            <meta name="sogou_site_verification" content="xxxx" />
          </Head>
          <Component {...pageProps} />
        </>
      </Layout>
    </Provider>
  );
};

export default MyApp;
