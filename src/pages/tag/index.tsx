import { ReactElement, useEffect, useState } from 'react';
import Head from 'next/head';
import config from '@/config';
import Card from '@cps/Card';
import axios from '@/utils/request';
import Link from 'next/link';
import { loadAnimate, visiteLog } from '@/utils';
import '@/styles/pages/tags.scss';
import styles from '@/styles/pages/tags.module.scss';
interface ArticleTag {
  createdTime: string;
  status: number;
  tagCode: string;
  tagId: number;
  tagName: string;
}
interface ArticleTagProps {
  list: Array<ArticleTag>;
}

const typeList = ['tag-type-mini', 'tag-type-normal', 'tag-type-big'];

const ArticleTagM = (props: ArticleTagProps): ReactElement => {
  const [list] = useState(props.list);

  useEffect(loadAnimate, [props.list]);

  // 路由打点
  useEffect(() => {
    visiteLog('/tag', '标签页');
  }, []);

  return (
    <>
      <Head>
        <title>标签分类-{config.blogName}</title>
        <meta name="description" content="文章分类标签在此！" />
      </Head>
      <Card bordered={false}>
        <ul className={`animated no-ani ${styles['class-block']}`}>
          {list.map((item) => (
            <li
              key={`tag-${item.tagId}`}
              className={`${styles['class-item']} ${
                typeList[Math.floor(Math.random() * 3)] +
                ' tag-color-' +
                Math.ceil(Math.random() * 6)
              }`}
            >
              <Link href={`/tag/${item.tagCode}`} key={item.tagId} prefetch={false}>
                <a className={styles['tag-link']}>{item.tagName}</a>
              </Link>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
};

// 服务端获取标签数据
// export async function getServerSideProps(): Promise<any> {
//   return await devAxios.get('/tag').then(({ data }) => {
//     return { props: data.data }
//   })
// }

ArticleTagM.getInitialProps = async () => {
  return await axios.get('/tag').then(({ data }) => data);
};

export default ArticleTagM;
