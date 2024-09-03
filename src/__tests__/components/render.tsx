import React, { FC, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../context/authProvider';
import { NotificationProvider } from '../../context/notificationProvider';

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: FC<WrapperProps> = ({ children }) => {
  return (
    <NotificationProvider>
      <BrowserRouter>
        <AuthProvider>{children}</AuthProvider>
      </BrowserRouter>
    </NotificationProvider>
  );
};

const testRender = (
  Component: React.ReactElement,
  options?: RenderOptions,
) => {
  return render(Component, { wrapper: Wrapper, ...options });
};

export { testRender as render };

