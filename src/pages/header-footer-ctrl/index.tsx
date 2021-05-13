import { useDispatch } from 'react-redux';
import { layoutHandler } from '@/redux/actions/config';
import { Typography } from 'antd';
import Link from 'next/link';
import { useEffect } from 'react';
const { Title, Paragraph } = Typography;

const WithOutHeaderFooterDemo = () => {
  const dispatch = useDispatch();

  console.log(123);

  useEffect(() => {
    dispatch(layoutHandler(true));

    return () => {
      dispatch(layoutHandler());
    };
  }, []);

  return (
    <Typography>
      <Title>没有出现头部、尾部和辅助模块</Title>
      <Paragraph>
        服务端不会只执行useEffect中的设置，所以需要直接将dispatch在render中执行，也许他会被执行多次
      </Paragraph>
      <Paragraph>
        <Link href="/" prefetch={false}>
          <a>返回首页</a>
        </Link>
      </Paragraph>
    </Typography>
  );
};

export default WithOutHeaderFooterDemo;
