import React, { ReactNode } from 'react';
import Header from '../components/header/Header';
import useScrollToTop from '../hooks/useScrollToTop';

interface DefaultProps {
  children: ReactNode;
}

const Default: React.FC<DefaultProps> = ({ children }) => {
  useScrollToTop();

  return (
    <div className="default">
      <Header />
      <div className="default__content">{children}</div>
    </div>
  );
};

export default Default;
