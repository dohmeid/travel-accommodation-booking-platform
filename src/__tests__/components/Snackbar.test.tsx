import React from 'react';
import '@testing-library/jest-dom';
import { screen, fireEvent, act, waitFor } from '@testing-library/react';
import { render } from './render';
import Snackbar from '../../components/shared/Snackbar/Snackbar';
import { NotificationType } from '../../context/notificationProvider';

jest.useFakeTimers();

describe('Snackbar Component', () => {
  const successMessage = {
    type: NotificationType.SUCCESS,
    message: 'This is a success message',
    onClose: jest.fn(),
  };

  const warningMessage = {
    type: NotificationType.WARNING,
    message: 'This is a warning message',
    onClose: jest.fn(),
  };

  const errorMessage = {
    type: NotificationType.ERROR,
    message: 'This is a error message',
    onClose: jest.fn(),
  };

  describe('Smoke Tests', () => {
    it('should render the snackbar with the correct message', () => {
      render(<Snackbar {...successMessage} />);
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText(successMessage.message)).toBeInTheDocument();
    });

    it('should render the snackbar with success messages correctly', () => {
      const { container } = render(<Snackbar {...successMessage} />);
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByRole('alert')).toHaveClass('success');
      expect(screen.getByText(successMessage.message)).toBeInTheDocument();
      expect(
        container.querySelector('.bi.bi-check-circle-fill'),
      ).toBeInTheDocument();
    });

    it('should render the snackbar with warning messages correctly', () => {
      const { container } = render(<Snackbar {...warningMessage} />);
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByRole('alert')).toHaveClass('warning');
      expect(screen.getByText(warningMessage.message)).toBeInTheDocument();
      expect(
        container.querySelector('.bi.bi-exclamation-triangle-fill'),
      ).toBeInTheDocument();
    });

    it('should render the snackbar with error messages correctly', () => {
      const { container } = render(<Snackbar {...errorMessage} />);
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByRole('alert')).toHaveClass('error');
      expect(screen.getByText(errorMessage.message)).toBeInTheDocument();
      expect(
        container.querySelector('.bi.bi-x-circle-fill'),
      ).toBeInTheDocument();
    });
  });

  describe('Basic Functionality', () => {
    it('should close the snackbar automatically after the specified duration', () => {
      render(<Snackbar {...successMessage} />);
      act(() => {
        jest.advanceTimersByTime(5000); //skip the timer
      });
      expect(successMessage.onClose).toHaveBeenCalledTimes(1);
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('should close the snackbar when the close button is clicked', () => {
      render(<Snackbar {...successMessage} />);
      fireEvent.click(screen.getByLabelText('Close notification'));
      expect(successMessage.onClose).toHaveBeenCalledTimes(1);
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('should decrease the progress bar over time', async () => {
      render(<Snackbar {...successMessage} />);

      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toBeInTheDocument();
      expect(progressBar).toHaveStyle('width: 100%');

      //skip half the timer period -> progress must be less by 50%
      act(() => {
        jest.advanceTimersByTime(2500);
      });
      expect(progressBar).toHaveStyle('width: 50%');

      //finish all the timer period -> progress bar must be gone (width near to 0.02, %2)
      await waitFor(
        () => {
          expect(parseFloat(progressBar.style.width)).toBeLessThanOrEqual(2);
        },
        { timeout: 5000 },
      );
    });
  });
});
