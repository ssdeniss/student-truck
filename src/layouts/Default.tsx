import React, { ReactNode } from 'react';
import { SnackbarProvider } from 'notistack';

interface DefaultProps {
  children: ReactNode;
}

const Default: React.FC<DefaultProps> = ({ children }) => {
  return (
    <SnackbarProvider maxSnack={5}>
      <div className="default">
        <div className="default__content">{children}</div>
      </div>
    </SnackbarProvider>
  );
};

export default Default;
