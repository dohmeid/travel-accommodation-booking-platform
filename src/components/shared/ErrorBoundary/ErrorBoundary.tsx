import React, { ErrorInfo, ReactNode, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import UnexpectedErrorPage from '../../../pages/UnexpectedErrorPage/UnexpectedErrorPage';

interface ErrorBoundaryProps {
  children: ReactNode;
}

const MyErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [retryCount, setRetryCount] = useState(0);


  const logErrorToService = (error: Error, errorInfo: ErrorInfo) => {
    console.error('Logging error:', error, errorInfo);
  };

  return (
    <ErrorBoundary
      FallbackComponent={UnexpectedErrorPage}
      onReset={() => setRetryCount(retryCount + 1)}
      resetKeys={[retryCount]}
      onError={logErrorToService}
    >
      {children}
    </ErrorBoundary>
  );
};

export default MyErrorBoundary;
