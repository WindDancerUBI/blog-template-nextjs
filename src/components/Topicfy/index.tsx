import { ReactElement, useEffect, useState } from 'react';
import { Anchor } from 'antd';

import Recursive from './Recursive';

const Topicfy = ({ heads }: { heads: Array<any> }): ReactElement => {
  const [topics, setTopics] = useState([]);
  const tocItems = [];
  useEffect(() => {
    heads.forEach((item) => {
      add(item.text, item.level);
    });
    setTopics(tocItems);
  }, [heads]);

  const add = (text, level) => {
    const item = { anchor: text, level, text };

    if (tocItems.length === 0) {
      // 第一个 item 直接 push
      tocItems.push(item);
    } else {
      let lastItem = tocItems[tocItems.length - 1]; // 最后一个 item

      if (item.level > lastItem.level) {
        // item 是 lastItem 的 children
        for (let i = lastItem.level + 1; i <= 6; i++) {
          const { children } = lastItem;
          if (!children) {
            // 如果 children 不存在
            lastItem.children = [item];
            break;
          }

          lastItem = children[children.length - 1]; // 重置 lastItem 为 children 的最后一个 item

          if (item.level <= lastItem.level) {
            // item level 小于或等于 lastItem level 都视为与 children 同级
            children.push(item);
            break;
          }
        }
      } else {
        // 置于最顶级
        tocItems.push(item);
      }
    }
  };
  return (
    <Anchor affix={false} showInkInFixed={true}>
      {topics.map((item) => (
        <Recursive key={item.anchor} tocItem={item} />
      ))}
    </Anchor>
  );
};

export default Topicfy;
