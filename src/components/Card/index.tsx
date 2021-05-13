import { CSSProperties, ReactElement } from 'react';

import './index.scss';

interface CardProps {
  className?: string;
  margin?: string | number;
  padding?: string | number;
  title?: string | number | ReactElement;
  children?: string | number | ReactElement;
  bordered?: boolean;
  style?: CSSProperties;
}

const Card = (props: CardProps): ReactElement => {
  const { margin, padding, title, children, bordered } = props;
  return (
    <div
      className={`replace ${props.className}`}
      style={{ margin, padding, ...props.style }}
    >
      {/* <!--解决在安卓机下border为1px出现不显示的问题--> */}
      <div className={`card ${bordered ? 'card-border' : ''}`}>
        {title && <div className="card-title">{title}</div>}
        <div className="card-body">{children}</div>
      </div>
    </div>
  );
};

Card.defaultProps = {
  className: ''
};

export default Card;
