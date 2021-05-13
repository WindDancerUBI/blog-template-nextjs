import React, { ReactElement } from 'react';
interface AboutProps {
  className?: string;
  children?: React.ReactNode;
}

const Container = ({ className, children }: AboutProps): ReactElement => {
  return <div className={className || `main-container`}>{children}</div>;
};

Container.defaultProps = {
  className: ''
};

export default Container;
