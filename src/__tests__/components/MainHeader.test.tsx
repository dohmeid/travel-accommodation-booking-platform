import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../context/authProvider';
import { NotificationProvider } from '../../context/notificationProvider';
import MainHeader from '../../components/shared/MainHeader/MainHeader';

const userInfo = { authentication: null, userType: null };
const getUserId = jest.fn();
const handleLoginSuccess = jest.fn();
const handleLogout = jest.fn();

const renderMainHeader = () => {
  render(
    <NotificationProvider>
      <BrowserRouter>
        <AuthContext.Provider
          value={{ userInfo, getUserId, handleLoginSuccess, handleLogout }}
        >
          <MainHeader />
        </AuthContext.Provider>
      </BrowserRouter>
    </NotificationProvider>,
  );
};

describe('MainHeader Component', () => {
  describe('Smoke Tests', () => {
    it('should render header with logo and Logout button', () => {
      renderMainHeader();
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByText(/travel/i)).toBeInTheDocument();
      expect(screen.getByText(/hub/i)).toBeInTheDocument();
      expect(screen.getByText(/logout/i)).toBeInTheDocument();
    });

    it('should render navigation links', () => {
      renderMainHeader();
      expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /search/i })).toBeInTheDocument();
      expect(
        screen.getByRole('link', { name: /checkout/i }),
      ).toBeInTheDocument();
    });
  });

  describe('Basic Functionality', () => {
    it('should call handleLogout when logout button is clicked', () => {
      renderMainHeader();
      const logoutButton = screen.getByText(/logout/i);
      fireEvent.click(logoutButton);
      expect(handleLogout).toHaveBeenCalledTimes(1);
    });
  });
});
