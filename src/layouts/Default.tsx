import React, { ReactNode } from 'react';

interface DefaultProps {
  children: ReactNode;
}

const Default: React.FC<DefaultProps> = ({ children }) => {
  return <div className="default">{children}</div>;
};

export default Default;
