import React, { ReactNode } from 'react';
import useScrollToTop from '../hooks/useScrollToTop';

interface DefaultProps {
  children: ReactNode;
}

const Default: React.FC<DefaultProps> = ({ children }) => {
  useScrollToTop();

  return (
    <div className="default">
      <div className="default__content">{children}</div>
    </div>
  );
};

export default Default;
