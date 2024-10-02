import React, { ReactNode } from 'react';

interface DefaultProps {
  children: ReactNode;
}

const Container: React.FC<DefaultProps> = ({ children }) => {
  return <div className="container">{children}</div>;
};

export default Container;
