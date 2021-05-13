import { ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import config from '@/config';
import axios from '@/utils/request';
import Card from '@cps/Card';
import { Tag, Divider } from 'antd';
import Link from 'next/link';
import { visiteLog } from '@/utils';
import styles from '@/styles/pages/index.module.scss';
import mediumZoom from 'medium-zoom';
import InfiniteScroll from 'react-infinite-scroller';

interface ArticleProps {
  articleId: number;
  articleCode: string;
  articleTitle: string;
  articleSynopsis: string;
  articleSynopsisImage: string;
  createdTime: string;
  updatedTime: string;
  articleHits: number;
  messageCount: number;
  articleType: string;
  tags: Array<{
    tagId: number;
    tagCode: string;
    tagName: string;
  }>;
}

interface HomeProps {
  list: Array<ArticleProps>;
  page: number;
  pageSize: number;
  total: number;
  totalPage: number;
}

const tagsBg = ['magenta', 'red', 'volcano', 'green', 'cyan', 'geekblue', 'purple'];

const Home = (props: HomeProps): ReactElement => {
  // 页码
  const [page, setPage] = useState(2);
  // 总页数
  const [totalPage, setTotalPage] = useState(props.totalPage);
  // 加载状态
  let loading = false;
  // 列表
  const [list, setList] = useState<Array<ArticleProps>>(props.list);

  const router = useRouter();

  const initList = () => {
    const sTop =
      pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    const ch = document.documentElement.clientHeight;
    const cardList = document.getElementsByClassName('no-ani');

    // 解决2k以上分辩率导致无法进入下一页问题
    // if (
    //   sTop + ch > document.body.scrollHeight ||
    //   sTop + ch === document.body.scrollHeight
    // ) {
    //   req()
    // }

    Array.prototype.slice.apply(cardList).forEach((item: HTMLBaseElement) => {
      setTimeout(() => {
        if (sTop + ch - 120 > item.offsetTop) {
          item.style.visibility = 'inherit';
          item.classList.remove('no-ani');
          item.classList.add('fadeIn');
        }
      }, 200);
    });
  };

  const req = () => {
    // 到底部，不再请求
    if (totalPage < page) {
      return false;
    }

    // 如果请求中的状态，延迟下次请求
    if (loading) {
      setTimeout(req, 500);

      return false;
    }

    // 加载中
    loading = true;

    // 请求文章列表
    axios
      .get(`/article/catalogue?page=${page}`)
      .then(({ data }: any) => {
        setTotalPage(data.totalPage);
        setList((_list) => _list.concat(data.list));
      })
      .then(() => {
        // 取消加载状态
        loading = false;
        setPage((_page) => _page + 1);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    initList();
    window.addEventListener('scroll', initList);
    return () => {
      window.removeEventListener('scroll', initList);
    };
  }, [props.list, page, totalPage]);

  // 打点
  useEffect(() => {
    visiteLog(router.asPath, '首页');
  }, []);

  useEffect(() => {
    mediumZoom(document.querySelectorAll(`img:not(.medium-zoom-image)`));
  }, [list]);

  return (
    <>
      <Head>
        <title>首页-{config.blogName}</title>
        <meta
          name="description"
          content="之间的个人博客，记录生活、工作中的经历经验，分享学习内容心得！之间,blog,简约,博客模板,黑白配,React,Vue,Web,网站"
        />
      </Head>
      <InfiniteScroll initialLoad={false} loadMore={req} hasMore={totalPage > page}>
        {list.map((item: ArticleProps) => (
          <Card
            key={`home-article-${item.articleId}`}
            bordered={true}
            padding="0 0 10px"
            style={{ visibility: 'hidden' }}
            className="animated no-ani"
            title={
              <div className={styles['title']}>
                <div className={styles['a-title']}>
                  <Link href={`/a/${item.articleCode}`} prefetch={false}>
                    <a className={styles['link']} target="_blank">
                      {item.articleTitle}
                    </a>
                  </Link>
                </div>
                <div className={styles['dis']}>
                  <div className={styles['dis-col']}>
                    标签：
                    {item.tags.map((tag, index) => (
                      <Tag
                        key={`home-tag-${tag.tagId}`}
                        color={tagsBg[index % tagsBg.length]}
                      >
                        <Link href={`/tag/${tag.tagCode}`} prefetch={false}>
                          <a>{tag.tagName}</a>
                        </Link>
                      </Tag>
                    ))}
                  </div>
                  <div className={styles['dis-col']}>
                    <span title="发布于">发布于：{item.createdTime.slice(0, 10)}</span>
                    {item.updatedTime && (
                      <>
                        <Divider type="vertical" />
                        <span title="最近更新时间">
                          最近更新：{item.updatedTime.slice(0, 10)}
                        </span>
                      </>
                    )}
                    <Divider type="vertical" />
                    <span title="访问量">阅读量：{item.articleHits}</span>
                    {item.messageCount !== 0 && (
                      <>
                        <Divider type="vertical" />
                        <span title="访问量">留言数：{item.messageCount}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            }
          >
            <div className={styles.synopsis}>
              {item.articleSynopsisImage && (
                <p className={styles['p-img']}>
                  <img
                    width="100%"
                    src={item.articleSynopsisImage}
                    alt="好了，你看不到这张图片了"
                  />
                </p>
              )}
              <p>{item.articleSynopsis}</p>
            </div>
          </Card>
        ))}
      </InfiniteScroll>

      {totalPage < page && (
        <div style={{ textAlign: 'center', fontSize: '12px', color: '#cfcfcf' }}>
          没了，没事留个言吧
        </div>
      )}
    </>
  );
};

// export async function getServerSideProps(): Promise<any> {
//   return await devAxios.get(`/article/catalogue?pageNum=1`).then(({ data }) => {
//     return { props: data.data }
//   })
// }
Home.getInitialProps = async () => {
  return await axios.get(`/article/catalogue?page=1`).then(({ data }) => data);
};

export default Home;
