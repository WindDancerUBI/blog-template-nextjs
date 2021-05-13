import { useEffect } from 'react';
import Head from 'next/head';
import { Card, Col, Row, Select, Space } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { StoreTypes } from '@/redux/reducer';
import { CHANGE_THEME } from '@/redux/actions/typeKeys';
import darkVars from '@/config/dark.json';
import lightVars from '@/config/light.json';

const Option = Select.Option;

import '@/styles/pages/demo/theme.scss';

import AlertPreview from '@/components-page/demo/Alert';
import FormPreview from '@/components-page/demo/Form';
import TablePreview from '@/components-page/demo/Table';
import TagPreview from '@/components-page/demo/Tag';
import UploadPreview from '@/components-page/demo/Upload';

import { loadAnimate, visiteLog } from '@/utils';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const config = useSelector((state: StoreTypes) => state.config);

  // 路由打点
  useEffect(() => {
    visiteLog(router.asPath, 'antd主题页');
    loadAnimate();
  }, []);

  return (
    <>
      <Head>
        <title>演示</title>
        <meta name="description" content="支持切换主题的nextjs开发！" />
      </Head>

      <div className="antd-theme">
        <Row gutter={[16, 0]}>
          <Col span={24}>
            <Card>
              <Select
                placeholder="Please select theme"
                value={config.themeName}
                onSelect={(value) => {
                  const vars = value === 'light' ? lightVars : darkVars;

                  dispatch({
                    type: CHANGE_THEME,
                    value
                  });

                  window['less'].modifyVars(vars).catch((error) => {
                    console.error(error);
                  });
                }}
              >
                <Option value="light">Light</Option>
                <Option value="dark">Dark</Option>
              </Select>
            </Card>
          </Col>
          <Col span={12}>
            <Space direction="vertical" size="middle">
              <Card title="Alert">
                <AlertPreview />
              </Card>
              <Card title="Tag">
                <TagPreview />
              </Card>
              <Card title="Table">
                <TablePreview />
              </Card>
            </Space>
          </Col>
          <Col span={12}>
            <Space direction="vertical" size="middle">
              <Card title="Form">
                <FormPreview />
              </Card>
              <Card title="Upload">
                <UploadPreview />
              </Card>
            </Space>
          </Col>
        </Row>
      </div>
    </>
  );
}
