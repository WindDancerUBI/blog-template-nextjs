import { ReactElement, useEffect, useState } from 'react';
import Head from 'next/head';
import config from '@/config';
import { Timeline } from 'antd';
import axios from '@/utils/request';
import { visiteLog } from '@/utils';

interface RecordItem {
  recordId: string | number;
  createdTime: string;
  recordContent: string;
}

interface RecordProps {
  totalPage: number;
  list: Array<RecordItem>;
}

const Record = (props: RecordProps): ReactElement => {
  // 记录列表
  const [list, setList] = useState<Array<RecordItem>>(props.list);
  // 页码
  let nextPageNum = 2;
  // 总页数
  let totalPage = props.totalPage;
  // 每页大小
  const pageSize = 13; // Math.floor(document.documentElement.clientHeight / 68)

  const getRecord = () => {
    axios
      .get('/record?pageNum=' + nextPageNum + '&pageSize=' + pageSize)
      .then(({ data }: any) => {
        totalPage = data.totalPage;
        setList((_list) => _list.concat(data.list));

        nextPageNum += 1;
      })
      .then(() => {
        initList();
      })
      .catch((error) => console.error(error));
  };

  const initList = () => {
    // 滚动条移动长度
    const sTop =
      pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    // 当前页面总长度
    const sHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    // 可见的页面长度
    const ch = document.documentElement.clientHeight;
    const cardList = document.getElementsByClassName('no-ani');
    const timer = 0;

    // 当滑到页面底部时自动请求数据
    if (sTop + ch === sHeight && nextPageNum <= totalPage) {
      getRecord();
    }

    Array.prototype.slice.apply(cardList).forEach((item, index) => {
      setTimeout(() => {
        if (sTop + ch - 120 > item.offsetTop) {
          item.classList.remove('no-ani');
          item.classList.add('fadeIn');
        }
      }, timer + index * 20);
    });
  };

  useEffect(() => {
    initList();
    window.addEventListener('scroll', initList);
    return () => {
      window.removeEventListener('scroll', initList);
    };
  }, [props.list]);

  // 路由打点
  useEffect(() => {
    visiteLog('/record', '记录页');
  }, []);

  return (
    <>
      <Head>
        <title>站内记录-{config.blogName}</title>
        <meta name="description" content="博客更新记录，简约时间标记等！" />
      </Head>
      <Timeline mode="alternate">
        {list.map((item: RecordItem) => (
          <Timeline.Item
            className="animated no-ani"
            color="green"
            label={item.createdTime}
            key={item.recordId}
          >
            <div dangerouslySetInnerHTML={{ __html: item.recordContent }}></div>
          </Timeline.Item>
        ))}
      </Timeline>
    </>
  );
};

// 获取文章数据
// export async function getServerSideProps(): Promise<any> {
//   return await devAxios.get(`/record?pageNum=1&pageSize=13`).then(({ data }) => {
//     return { props: data.data }
//   })
// }

Record.getInitialProps = async (): Promise<any> => {
  return await axios.get(`/record?pageNum=1&pageSize=13`).then(({ data }) => data);
};

export default Record;
