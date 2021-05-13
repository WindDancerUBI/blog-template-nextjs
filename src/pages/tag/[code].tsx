import { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import config from '@/config';
import { useRouter } from 'next/router';
import { visiteLog } from '@/utils';
import axios from '@/utils/request';
import { BulbOutlined, BookOutlined } from '@ant-design/icons';
// import TimeLine from '@cps/TimeLine'
// import TimeLineItem from '@/components/TimeLine/timeLineItem'
import { Timeline } from 'antd';
import ErrorPage from 'next/error';

import styles from '@/styles/pages/tagList.module.scss';
interface ArticleListOfTagProps {
  code: number;
  tagName: string;
  list: Array<any>;
}
const ArticleListOfTag = (props: ArticleListOfTagProps): ReactElement => {
  const initList = () => {
    // 滚动条移动长度
    const sTop =
      pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    // 可见的页面长度
    const ch = document.documentElement.clientHeight;
    const cardList = document.getElementsByClassName('no-ani');
    const timer = 0;
    Array.prototype.slice.apply(cardList).forEach((item, index) => {
      setTimeout(() => {
        let actualTop = item.offsetTop;
        let current = item.offsetParent;
        while (current !== null) {
          actualTop += current.offsetTop + current.clientTop;
          current = current.offsetParent;
        }
        if (sTop + ch > actualTop) {
          item.classList.remove('no-ani');
          item.classList.add('fadeIn');
        }
      }, timer + index * 30);
    });
  };

  useEffect(initList, [props.list]);

  // 路由打点
  const router = useRouter();
  useEffect(() => {
    visiteLog(router.asPath, `标签-${props.tagName}`);

    window.addEventListener('scroll', initList);
    return () => {
      window.removeEventListener('scroll', initList);
    };
  }, []);

  return (
    <>
      <Head>
        <title>
          标签{props.tagName}下列表-{config.blogName}
        </title>
        <meta
          name="description"
          content={`标签${props.tagName}下的文章列表。欢迎对博客、作者提出宝贵的建议，已支持QQ、github登录留言！!`}
        />
        <meta name="keywords" content={`${config.baseKeys},${props.tagName}`} />
      </Head>
      {props.code === 404 ? (
        <ErrorPage statusCode={props.code} />
      ) : (
        <Timeline>
          {props.list.map((yearItem) => (
            <Timeline.Item
              key={yearItem.year}
              className={`animated no-ani ${styles['line-item']}`}
              color="green"
              dot={<BookOutlined />}
            >
              <h3>{yearItem.year}</h3>
              <ul>
                {yearItem.list &&
                  yearItem.list.map((item) => (
                    <li key={`tag-acticle-${item.articleId}`} className="animated no-ani">
                      <a href={`/a/${item.articleCode}`} target="_blank">
                        {item.articleTitle}
                      </a>
                      <span>{item.createdTime}</span>
                    </li>
                  ))}
              </ul>
            </Timeline.Item>
          ))}
          <Timeline.Item className={styles['line-item']} dot={<BulbOutlined />}>
            <h3>很久很久以前</h3>
          </Timeline.Item>
        </Timeline>
      )}
    </>
  );
};

// export async function getServerSideProps(context: {
//   params: { code: string }
// }): Promise<any> {
//   return await devAxios
//     .get(`/article/pigeonhole?tagCode=${context?.params?.code}`)
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

ArticleListOfTag.getInitialProps = async (context: {
  query: { code: string };
  res: any;
}): Promise<any> => {
  return await axios
    .get(`/article/pigeonhole?tagCode=${context?.query?.code}`)
    .then(({ data }) => data)
    .catch(() => {
      return {
        code: 404
      };
    });
};

export default ArticleListOfTag;
