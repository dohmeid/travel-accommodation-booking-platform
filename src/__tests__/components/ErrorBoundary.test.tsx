import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import MyErrorBoundary from '../../components/shared/ErrorBoundary/ErrorBoundary';

// Component that throws an error
const errorMessage = 'This is test error';
const myError = new Error(errorMessage);
const ErrorThrowingComponent = () => {
  throw myError;
};

describe('Error Boundary', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render children when there is no error', async () => {
    render(
      <MyErrorBoundary>
        <div>Child content</div>
      </MyErrorBoundary>,
    );
    expect(screen.getByText(/Child content/i)).toBeInTheDocument();
  });

  it('should render the fallback UI when an error is thrown', () => {
    render(
      <MyErrorBoundary>
        <ErrorThrowingComponent />
        <div>Child content</div>
      </MyErrorBoundary>,
    );
    expect(screen.getByText(/Oops! Something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText('Try again')).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('should log errors to the console', () => {
    const logSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <MyErrorBoundary>
        <ErrorThrowingComponent />
      </MyErrorBoundary>,
    );

    expect(logSpy).toHaveBeenCalledWith(
      'Logging error:',
      expect.any(Error),
      expect.any(Object),
    );

    //restore console.error
    logSpy.mockRestore();
  });
});
