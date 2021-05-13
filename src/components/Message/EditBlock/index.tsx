import { CSSProperties, ReactElement, useRef, useState } from 'react';
import { insert } from '@/utils';
import { Popover } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import Face from '@cps/Face';

import styles from './index.module.scss';

interface EditBlockProps {
  style?: CSSProperties;
  rows?: number;
  handleSubmit: (content: string) => void;
}

const EditBlock = (props: EditBlockProps): ReactElement => {
  const editAreaRef = useRef();
  // 内容
  const [content, setContent] = useState<string>('');
  // 表情显示
  const [faceShow, setFaceShow] = useState<boolean>(false);

  // 表情选中
  const faceChecked = (title: string) => {
    setFaceShow(false);
    setContent(insert(editAreaRef.current, title));
  };

  const handleSubmit = () => {
    props.handleSubmit(content.trim());
  };

  const editRef = useRef();

  return (
    <div style={props.style} ref={editRef}>
      <div className={styles['editor-content']}>
        <textarea
          rows={props.rows || 5}
          value={content}
          ref={editAreaRef}
          onChange={(ele) => {
            setContent(ele.target.value);
          }}
        />
      </div>
      <div className={styles['editor-tool']}>
        <ul>
          <li className={styles['tool-face']}>
            <Popover
              getPopupContainer={() => {
                return editRef.current;
              }}
              arrowPointAtCenter={true}
              placement="topLeft"
              overlayClassName="emoji-popup"
              content={<Face faceChecked={faceChecked} />}
              trigger="click"
              visible={faceShow}
              onVisibleChange={(visible) => setFaceShow(visible)}
            >
              <SmileOutlined
                onClick={() => {
                  setFaceShow((_faceShow) => !_faceShow);
                }}
              />
            </Popover>
          </li>
          <li className={styles['tool-submit']}>
            <button onClick={handleSubmit}>留言</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EditBlock;
