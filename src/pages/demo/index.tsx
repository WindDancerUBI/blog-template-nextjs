import { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import config from '@/config';
import { loadAnimate, visiteLog } from '@/utils';

import styles from '@/styles/pages/demo/index.module.scss';
import { Col, Row, Card } from 'antd';
import Link from 'next/link';

const Meta = Card.Meta;

const ExntendPage = (): ReactElement => {
  // 路由打点
  useEffect(() => {
    visiteLog('/demo', '演示页');
    loadAnimate();
  }, []);

  return (
    <>
      <Head>
        <title>演示内容-{config.blogName}</title>
        <meta
          name="description"
          content="之间的个人博客在线demo列表！简单的迷宫寻路、在nextjs中切换暗黑主题等"
        />
      </Head>
      <div className={styles['demo-list']}>
        <Row gutter={[16, 0]}>
          <Col span="8">
            <Card hoverable cover={<img alt="example" src="/images/0507213036.png" />}>
              <Meta
                title={
                  <Link href="/demo/theme" prefetch={false}>
                    <a>Antd暗黑主题在线切换演示</a>
                  </Link>
                }
              />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default ExntendPage;
