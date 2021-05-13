import { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import config from '@/config';
import Message from '@cps/Message';
import { visiteLog } from '@/utils';
const LeaveMessage = (): ReactElement => {
  // 路由打点
  useEffect(() => {
    visiteLog('/message', '留言板');
  }, []);

  return (
    <>
      <Head>
        <title>留言-{config.blogName}</title>
        <meta
          name="description"
          content="欢迎对博客、作者提出宝贵的建议，已支持QQ、github登录留言！！"
        />
      </Head>
      <Message className="container" title="欢迎来到留言板，期待与你的交流" />
    </>
  );
};

export default LeaveMessage;
