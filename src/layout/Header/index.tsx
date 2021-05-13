import { ReactElement, useState } from 'react';
import { MenuUnfoldOutlined } from '@ant-design/icons';
import { Drawer } from 'antd';

import Menu from './Menu';
import styles from './index.module.scss';

const Header = (): ReactElement => {
  const [drawerVisible, setVisible] = useState(false);

  const onClose = () => {
    setVisible(false);
  };

  return (
    <header className="g-header">
      <div className="outer-container">
        <div className={styles['pc']}>
          <Menu />
          <div className={styles['pc-title']}>你好，陌生猿~</div>
        </div>
        <div className={styles['m']}>
          <div className={styles['m-title']}>之间的个人博客</div>
          <MenuUnfoldOutlined
            className={styles['m-menu-open']}
            onClick={() => {
              setVisible(!drawerVisible);
            }}
          />
          <Drawer closable={false} onClose={onClose} visible={drawerVisible}>
            <Menu />
          </Drawer>
        </div>
      </div>
    </header>
  );
};

export default Header;
