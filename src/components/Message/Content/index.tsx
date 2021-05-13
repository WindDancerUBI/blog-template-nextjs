import { ReactElement, useEffect, useState } from 'react';
import { names } from '@cps/Face/faceNames';
const Content = ({ content }: { content: string }): ReactElement => {
  const [dom, setDom] = useState([]);

  useEffect(() => {
    const text = content.split(/\[[a-zA-Z\u4e00-\u9fa5]{1,4}\]/g);
    const emojis = content.match(/\[[a-zA-Z\u4e00-\u9fa5]{1,4}\]/g);

    text.forEach((textItem, index) => {
      setDom((_dom) => _dom.concat([textItem]));

      if (emojis !== null && emojis[index]) {
        setDom((_dom) => _dom.concat([`/face/${names.indexOf(emojis[index])}.gif`]));
      }
    });
  }, [content]);

  return (
    <>
      {dom.map((domItem, index) => (
        <span key={`text-${index}`}>
          {index % 2 === 0 ? <span>{domItem}</span> : <img src={domItem} />}
        </span>
      ))}
    </>
  );
};
export default Content;
