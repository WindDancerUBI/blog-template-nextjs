import { ReactElement } from 'react';
import { names } from './faceNames';

import './index.scss';

const Face = ({
  faceChecked
}: {
  faceChecked: (title: string, index: number) => void;
}): ReactElement => {
  return (
    <ol id="face" className="g-emoji">
      {names.map((item: string, index: number) => (
        <li
          key={`emoji-item-${index}`}
          onClick={() => {
            faceChecked(item, index);
          }}
          title={item}
        >
          <img src={`/face/${index}.gif`} />
        </li>
      ))}
    </ol>
  );
};

export default Face;
