import { ReactElement, useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button, Tooltip } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
import staticConfig from '@/config';
import Card from '@cps/Card';
import { visiteLog } from '@/utils';
import axios from '@/utils/request';
import mediumZoom from 'medium-zoom';
import ErrorPage from 'next/error';
import { loadAnimate } from '@/utils';

import styles from '@/styles/pages/detail.module.scss';

import Topicfy from '@cps/Topicfy';
import Message from '@cps/Message';
import { NextApiRequest } from 'next';
import { useSelector } from 'react-redux';
import { StoreTypes } from '@/redux/reducer';

import MdEditor from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';

export interface ArticleProps {
  code: number;
  articleTitle: string;
  articleSynopsis: string;
  articleContent: string;
  articleCode: string;
}

const ArticleDetail = (props: ArticleProps): ReactElement => {
  // redux对象
  const config = useSelector((state: StoreTypes) => state.config);

  // 解析MD语法插入
  const [heads, setHeads] = useState([]);

  // 路由打点
  const router = useRouter();

  useEffect(() => {
    visiteLog(router.asPath, props.articleTitle);
    loadAnimate();
    if (props.code !== undefined) {
      return;
    }

    lazyload(); // 页面载入完毕加载可是区域内的图片
    window.addEventListener('scroll', lazyload);

    function lazyload() {
      const imgs: any = document.querySelectorAll('img[data-src]');

      if (imgs.length === 0) {
        window.removeEventListener('scroll', lazyload);
      }

      // 监听页面滚动事件
      const seeHeight = document.documentElement.clientHeight; // 可见区域高度
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop; // 滚动条距离顶部高度
      for (let i = 0; i < imgs.length; i++) {
        if (imgs[i].offsetTop < seeHeight + scrollTop) {
          imgs[i].src = imgs[i].getAttribute('data-src');
          imgs[i].removeAttribute('data-src');
        }
      }
    }

    mediumZoom(document.querySelectorAll('.content img'), {
      background: config.themeName === 'dark' ? '#000' : '#fff'
    });

    const ml: any = document.querySelector('div[lazy-play]');
    ml.style = '';
  }, []);

  useEffect(() => {
    setTimeout(() => {
      mediumZoom(document.querySelectorAll('.content img'), {
        background: config.themeName === 'dark' ? '#000' : '#fff'
      });
    }, 1000);
  }, []);

  return (
    <>
      <Head>
        <title>
          {props.articleTitle}-{staticConfig.blogName}
        </title>
        <meta name="description" content={props.articleSynopsis} />
      </Head>
      {props.code === 404 ? (
        <ErrorPage statusCode={props.code} />
      ) : (
        <>
          <div className="g-row">
            <div className="g-col g-col-18 m-col-24 print-col-24 animated no-ani">
              <article className="article">
                <h1 className="title">{props.articleTitle}</h1>
                <MdEditor
                  modelValue={props.articleContent}
                  editorClass="content"
                  theme={config.themeName}
                  editorId="could-edit"
                  previewOnly
                  onGetCatalog={setHeads}
                />
              </article>
            </div>

            <div
              className={`g-col g-col-6 m-col-hidden print-hidden animated no-ani ${styles['sticky-item']}`}
              lazy-play=""
              style={{ visibility: 'hidden' }}
            >
              <Card margin="10px 7.5px" title="目录" bordered={false}>
                <Topicfy heads={heads} />
              </Card>
              <div className={styles['item-spi']}>
                <Tooltip placement="bottom" title="勾选背景图形才显示打印样式！">
                  <Button
                    block
                    onClick={() => {
                      window.print();
                    }}
                  >
                    <PrinterOutlined />
                    看不全？试试pdf查看
                  </Button>
                </Tooltip>
              </div>
            </div>
          </div>
          <Card margin="10px 7.5px" className="print-hidden animated no-ani">
            <Message
              title="评论区"
              type="article"
              articleCode={props.articleCode}
              pageUri={`a/${props.articleCode}#write`}
            />
          </Card>
        </>
      )}
    </>
  );
};

// 获取文章数据
// export async function getServerSideProps(context: {
//   params: { code: string }
//   req: NextApiRequest
// }): Promise<any> {
//   const getClientIp = (req) => {
//     return (
//       req.headers['x-forwarded-for'] ||
//       req.connection.remoteAddress ||
//       req.socket.remoteAddress ||
//       req.connection.socket.remoteAddress ||
//       ''
//     )
//   }
//   const ip = getClientIp(context.req)

//   return await devAxios
//     .get(`/article/${context?.params?.code}?ip=${ip}`)
//     .then(({ data }) => {
//       if (data.code === 500) {
//         return {
//           notFound: true
//         }
//       } else {
//         return { props: data.data }
//       }
//     })
// }

ArticleDetail.getInitialProps = async (context: {
  query: { code: string };
  req: NextApiRequest;
}): Promise<any> => {
  const getClientIp = (req) => {
    return (
      req &&
      (req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress ||
        '')
    );
  };
  const ip = getClientIp(context.req) || 0;

  return await axios
    .get(`/article/${context?.query?.code}?ip=${ip}`)
    .then(({ data }) => data)
    .catch(() => {
      return {
        code: 404,
        articleTitle: '',
        articleSynopsis: '',
        articleContent: '',
        articleCode: ''
      };
    });
};

export default ArticleDetail;
