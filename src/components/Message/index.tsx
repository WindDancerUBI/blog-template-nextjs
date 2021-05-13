import { ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import LayoutEditor from './EditBlock';
import { message, Popover, Avatar, Divider } from 'antd';
import { QqOutlined, GithubOutlined, UserOutlined } from '@ant-design/icons';
import axios from '@/utils/request';
import LayoutContent from './Content';
import styles from './index.module.scss';
import { loadAnimate } from '@/utils';
interface MessageProps {
  className?: string;
  title: string;
  type: 'all' | 'article';
  pageUri?: string;
  articleCode?: string;
}

const Message = (props: MessageProps): ReactElement => {
  // 用户信息
  const [userInfo, setUserInfo] = useState({
    headUrl: '',
    userName: ''
  });

  // 是否登录
  const logined = useMemo(() => {
    return userInfo.userName !== '';
  }, [userInfo.userName]);

  // 头像登录父元素
  const editorContainerRef = useRef();

  // 留言分页信息
  const [resData, setResData] = useState({
    page: 0,
    total: 0,
    totalPage: 0,
    list: []
  });

  const handleSubmit = (content: string) => {
    if (content === '') {
      // 提示错误信息
      message.error('还是写点什么吧，不然也不知道你说啥是吧！');
      return;
    }
    axios
      .post('/message', {
        content,
        articleCode: props.articleCode,
        ...replyInfo
      })
      .then((res: any) => {
        if (res.code === 0) {
          // 刷新当前页
          location.reload();
        } else {
          // 提示错误信息
          message.error(res.msg);
          throw res;
        }
      });
  };

  const login = (type: string) => {
    location.href = `/api/login/${type}?redirectUri=${props.pageUri}`;
  };

  // 登出
  const loginOut = () => {
    axios
      .get('/loginOut')
      .then((res: any) => {
        // 注销成功
        if (res.code === 0) {
          setUserInfo(() => {
            return {
              userName: '',
              headUrl: ''
            };
          });
        } else {
          throw res;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getMessage = () => {
    axios
      .get(`/message?page=${resData.page + 1}&articleCode=${props.articleCode}`)
      .then((res) => {
        setResData((_data) => {
          return {
            page: res.data.page,
            total: res.data.total,
            totalPage: res.data.totalPage,
            list: _data.list.concat(res.data.list)
          };
        });
      })
      .then(loadAnimate)
      .catch((error) => {
        console.log(error);
      });
  };

  const getUserInfo = () => {
    axios
      .get('/loginInfo')
      .then((res: any) => {
        if (res.code === 0) {
          setUserInfo(res.data);
        } else {
          console.log(res.msg);
        }
      })
      .catch(() => {
        // console.error(error)
      });
  };

  // 控制回复框显示
  const [replyInfo, setReplyInfo] = useState({
    pId: 0,
    replyUserId: null
  });

  const replyRef = useRef<any>();

  useEffect(() => {
    loadAnimate();
    getUserInfo();
    getMessage();

    const replyHandler = (e: any) => {
      if (!replyRef.current || !replyRef.current.contains(e.target)) {
        setReplyInfo({
          pId: 0,
          replyUserId: null
        });
      }
    };

    window.addEventListener('click', replyHandler);

    return () => {
      window.removeEventListener('click', replyHandler);
    };
  }, []);

  return (
    <>
      <h3 className="animated no-ani">{props.title}</h3>
      <div className={`animated no-ani ${styles['editer-block']}`}>
        <div className={styles['editor']} ref={editorContainerRef}>
          <Popover
            arrowPointAtCenter={true}
            trigger="click"
            placement="right"
            getPopupContainer={() => editorContainerRef.current}
            content={
              <>
                {!logined && (
                  <div className={styles['unlogin']}>
                    <QqOutlined
                      title="使用QQ账号授权登录"
                      onClick={() => {
                        login('qq');
                      }}
                      className={styles['login-button']}
                    />
                    <GithubOutlined
                      title="使用GitHub账号授权登录"
                      onClick={() => {
                        login('github');
                      }}
                      className={styles['login-button']}
                    />
                  </div>
                )}
                {logined && (
                  <span
                    className={styles['welcome-login']}
                  >{`${userInfo.userName}，你好！`}</span>
                )}
              </>
            }
          >
            <div className={styles['editor-user']}>
              {!logined ? (
                <Avatar icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
              ) : (
                <Avatar className={styles['editor-user-head']} src={userInfo.headUrl} />
              )}
            </div>
          </Popover>
          {logined && (
            <a className={styles['login-out']} title="退出登录" onClick={loginOut}>
              退出
            </a>
          )}
        </div>
        <div className={styles['editer']}>
          <LayoutEditor handleSubmit={handleSubmit} />
        </div>
      </div>
      <div className={styles['history-block']}>
        <div className={`animated no-ani ${styles['history-title']}`}>
          <h5>共{resData.total}条记录</h5>
        </div>
        <div id="content-head" className={styles['history-content']}>
          {resData.list.map((item: any) => (
            <div
              key={`message-item-${item.id}`}
              className={`animated no-ani ${styles['message-item']}`}
            >
              <div className={styles.avatar}>
                <Avatar size="large" src={item.headUrl} />
              </div>
              <div className={styles.content}>
                <ol className={styles.author}>
                  <li>
                    <span>{item.userName}</span>
                    <span className={styles['app-type']}>{item.appType}</span>
                  </li>
                  <li>{item.createdTime}</li>
                </ol>
                <div className={styles['content-detail']}>
                  <LayoutContent content={item.content} />
                </div>
                {/* {logined && (
                  <div>
                    <div className={styles.action}>
                      <span
                        className={styles['acion-item']}
                        onClick={(e: any) => {
                          replyRef.current = e.target.parentNode.parentNode
                          setReplyInfo({ pId: item.id, replyUserId: item.userId })
                        }}
                      >
                        回复
                      </span>
                    </div>
                    {replyInfo.pId === item.id && (
                      <LayoutEditor
                        rows={1}
                        handleSubmit={handleSubmit}
                        style={{ marginBottom: 14 }}
                      />
                    )}
                  </div>
                )} */}
                {item.children && item.children.length !== 0 && (
                  <div className={styles.child}>
                    {item.children.map((child) => (
                      <div
                        key={`message-item-${child.id}`}
                        className={`animated no-ani ${styles['message-item']}`}
                      >
                        <div className={styles.avatar}>
                          <Avatar size="large" src={child.headUrl} />
                        </div>
                        <div className={styles.content}>
                          <ol className={styles.author}>
                            <li>
                              <span>{child.userName}</span>
                              <span className={styles['app-type']}>{child.appType}</span>
                            </li>
                            <li>{child.createdTime}</li>
                          </ol>
                          <div className={styles['content-detail']}>
                            <LayoutContent
                              content={`回复 ${child.replyUserName}：${child.content}`}
                            />
                          </div>
                          {/* {logined && (
                            <div>
                              <div className={styles.action}>
                                <span
                                  className={styles['acion-item']}
                                  onClick={(e: any) => {
                                    replyRef.current = e.target.parentNode.parentNode

                                    setReplyInfo({
                                      pId: child.id,
                                      replyUserId: item.userId
                                    })
                                  }}
                                >
                                  回复
                                </span>
                              </div>
                              {replyInfo.pId === child.id && (
                                <LayoutEditor
                                  rows={1}
                                  handleSubmit={handleSubmit}
                                  style={{ marginBottom: 14 }}
                                />
                              )}
                            </div>
                          )} */}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <Divider />
              </div>
            </div>
          ))}

          <div className={styles['load-more']}>
            {resData.page !== resData.totalPage && resData.total !== 0 ? (
              <span onClick={getMessage}>加载更多</span>
            ) : (
              <div style={{ textAlign: 'center', fontSize: '12px', color: '#cfcfcf' }}>
                没了，没事留个言吧
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

Message.defaultProps = {
  type: 'all',
  pageUri: 'message',
  articleCode: ''
};

export default Message;
