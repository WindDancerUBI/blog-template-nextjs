import { ReactElement, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './menu.module.scss';

const Menu = (): ReactElement => {
  useEffect(() => {
    const iconScript = document.createElement('script');
    iconScript.setAttribute('src', '//at.alicdn.com/t/font_2469847_fv4r0haun4n.js');
    document.body.appendChild(iconScript);
  }, []);

  const { asPath } = useRouter();

  const linkClassName = (path: string): string => {
    return asPath === path ? styles['router-active'] : '';
  };
  return (
    <nav className={styles['header-menu']}>
      <ul>
        <li>
          <Link href="/" prefetch={false}>
            <a className={linkClassName('/')}>
              <svg className={styles['icon']} aria-hidden="true">
                <use xlinkHref="#icon-home" />
              </svg>
              首页
            </a>
          </Link>
        </li>
        <li>
          <Link href="/tag" prefetch={false}>
            <a className={linkClassName('/tag')}>
              <svg className={styles['icon']} aria-hidden="true">
                <use xlinkHref="#icon-biaoqian" />
              </svg>
              标签
            </a>
          </Link>
        </li>
        <li>
          <Link href="/record" prefetch={false}>
            <a className={linkClassName('/record')}>
              <svg className={styles['icon']} aria-hidden="true">
                <use xlinkHref="#icon-jilu" />
              </svg>
              记录
            </a>
          </Link>
        </li>
        <li>
          <Link href="/about" prefetch={false}>
            <a className={linkClassName('/about')}>
              <svg className={styles['icon']} aria-hidden="true">
                <use xlinkHref="#icon-gerenxinxi" />
              </svg>
              关于
            </a>
          </Link>
        </li>
        <li>
          <Link href="/message" prefetch={false}>
            <a className={linkClassName('/message')}>
              <svg className={styles['icon']} aria-hidden="true">
                <use xlinkHref="#icon-TIFFANYSROOM_huaban" />
              </svg>
              留言
            </a>
          </Link>
        </li>
        <li>
          <Link href="/demo" prefetch={false}>
            <a className={linkClassName('/demo')}>
              <svg className={styles['icon']} aria-hidden="true">
                <use xlinkHref="#icon-project" />
              </svg>
              演示
            </a>
          </Link>
        </li>
        <li>
          <Link href="/header-footer-ctrl" prefetch={false}>
            <a className={linkClassName('/header-footer-ctrl')}>
              <svg className={styles['icon']} aria-hidden="true">
                <use xlinkHref="#icon-project" />
              </svg>
              无头
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
