import { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import { Tag } from 'antd';
import { ManOutlined } from '@ant-design/icons';
import Block from '@cps/Block';
import config from '@/config';
import { loadAnimate, visiteLog } from '@/utils';
import styles from '@/styles/pages/about.module.scss';

const About = (): ReactElement => {
  // 路由打点
  useEffect(() => {
    visiteLog('/about', '关于页');
    loadAnimate();
  }, []);

  return (
    <>
      <Head>
        <title>关于-{config.blogName}</title>
        <meta
          name="description"
          content="关于之间的个人博客网站、作者！之间,blog,简约,博客模板,黑白配,React,Vue,Web,网站"
        />
      </Head>
      <Block title="个人介绍" className="animated no-ani">
        <>
          <p className={styles['description']}>网名：之间</p>
          <p className={styles['description']}>
            性别：
            <ManOutlined />
          </p>
          <p className={styles['description']}>年龄：还年轻</p>
          <p className={styles['description']}>
            描述：重庆人，毕业于
            <a href="http://www.cqut.edu.cn/" target="_blank">
              重庆理工大学
            </a>
            软件工程系，90后Web前端开发，2006美国《时代周刊》年度风云人物。
          </p>
        </>
      </Block>
      <Block title="联系方式" id="contact" className="animated no-ani">
        <>
          <p className={styles['description']}>邮箱：zbfcqtl@163.com</p>
          <p className={styles['description']}>
            GitHub：
            <a href="https://github.com/zhoubangfu" target="_blank">
              https://github.com/zhoubangfu
            </a>
          </p>
        </>
      </Block>
      <Block title="说明" className="animated no-ani">
        <>
          <p className={styles['description']}>
            非纯技术博客，所有内容不代表任何组织、团体等，站内分享的资源如有侵犯您的权利，请通过
            <b>联系方式</b>联系我删除。
          </p>
          <p className={styles['description']}>
            非原创内容均已附上的原文链接，使用的某些工具等也附上了出处，如发现未完善内容，请通过
            <b>联系方式</b>联系我。
          </p>
          <p className={styles['description']}>
            博客不兼容IE，效果不佳情况下请移步
            <a href="https://www.google.cn/intl/zh-CN/chrome/" target="_blank">
              chrome
            </a>
            。
          </p>
        </>
      </Block>
      <Block title="贴个标签" className="animated no-ani">
        <>
          <p className={styles['description']}>
            <Tag color="cyan">React</Tag>
            <Tag color="gold">Vue</Tag>
            <Tag color="cyan">Sass</Tag>
            <Tag color="volcano">Jquery</Tag>
            <Tag color="gold">Webpack</Tag>
            <Tag color="cyan">WeApp</Tag>
            <Tag color="lime">Java</Tag>
          </p>
          <p className={styles['description']}>
            <Tag color="volcano">羽毛球</Tag>
            <Tag color="cyan">跑步</Tag>
            <Tag color="lime">LOL</Tag>
            <Tag color="magenta">唱歌</Tag>
            <Tag color="blue">出行</Tag>
          </p>
          <p className={styles['description']}>
            <Tag color="lime">柯南</Tag>
            <Tag color="blue">星际穿越</Tag>
            <Tag color="volcano">爱情公寓</Tag>
            <Tag color="cyan">复仇者联盟</Tag>
            <Tag color="magenta">超神学院</Tag>
          </p>
        </>
      </Block>
      <Block title="喜欢的话" className="animated no-ani">
        <p className={styles['description']}>
          --希望你的每一次用心，都能换来一个好的结果。
        </p>
      </Block>
      <Block title="友情链接" className="animated no-ani">
        <p className={styles['description']}>
          <span className={styles['fri-link']}>
            <a
              href="https://bywave.io/aff.php?aff=10329"
              target="_blank"
              title="我啥也不知道！"
            >
              机场
            </a>
          </span>
          <span className={styles['fri-link']}>
            <a href="https://www.iconfont.cn" target="_blank" title="阿里提供的图标">
              iconfont
            </a>
          </span>
        </p>
      </Block>
    </>
  );
};

export default About;
