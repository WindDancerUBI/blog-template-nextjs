import { ReactElement } from 'react';
import { Divider, Tooltip } from 'antd';
import Container from '@/components/Container';

import styles from './style.module.scss';

const About = (): ReactElement => {
  return (
    <footer className="g-footer">
      <Container>
        <div className={styles['zj-msg']}>
          <a href="https://beian.miit.gov.cn/" target="_blank">
            渝ICP备xxxxxxxxx号
          </a>
          <Divider type="vertical" />
          <a href="https://beian.miit.gov.cn/" target="_blank">
            别的内容xxxxxx
          </a>
          <Divider type="vertical" />
          <Tooltip title="请邮件zbfcqtl@gmail.com，谢谢！">
            <a>联系我</a>
          </Tooltip>
        </div>
      </Container>
    </footer>
  );
};

export default About;
