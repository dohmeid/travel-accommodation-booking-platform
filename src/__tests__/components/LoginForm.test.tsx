import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { render } from './render';
import LoginForm from '../../components/LoginForm/LoginForm';
import { authenticateUser } from '../../api/authService';

jest.mock('../../api/authService');

const getters = {
  getUserNameInput: () => screen.getByPlaceholderText(/username/i),
  getPasswordInput: () => screen.getByPlaceholderText(/password/i),
  getShowPasswordCheckbox: () =>
    screen.getByLabelText(/show or hide password/i),
  getLoginButton: () =>
    screen.getByRole('button', {
      name: /login/i,
    }),
};

describe('LoginForm tests', () => {
  describe('Smoke Tests', () => {
    it('should render LoginForm Component correctly', () => {
      render(<LoginForm />);

      const userNameInput = getters.getUserNameInput();
      expect(userNameInput).toBeInTheDocument();

      const passwordInput = getters.getPasswordInput();
      expect(passwordInput).toBeInTheDocument();

      const toggleCheckbox = getters.getShowPasswordCheckbox();
      expect(toggleCheckbox).toBeInTheDocument();

      const loginButton = getters.getLoginButton();
      expect(loginButton).toBeInTheDocument();
    });

    it('should toggle password visibility when checkbox is clicked', () => {
      render(<LoginForm />);

      const toggleCheckbox = getters.getShowPasswordCheckbox();
      const passwordField = getters.getPasswordInput();

      //initially, password is hidden
      expect(passwordField).toHaveAttribute('type', 'password');

      //after first toggle, password is shown
      fireEvent.click(toggleCheckbox);
      expect(passwordField).toHaveAttribute('type', 'text');

      //after first toggle, password is hidden
      fireEvent.click(toggleCheckbox);
      expect(passwordField).toHaveAttribute('type', 'password');
    });
  });

  describe('Validation Tests', () => {
    beforeEach(() => {
      render(<LoginForm />);
    });

    it('should has the login button disabled by default', () => {
      const loginButton = getters.getLoginButton();
      expect(loginButton).toBeDisabled();
    });

    it('should has the login button disabled when at least one of the input fields is empty', () => {
      const loginButton = getters.getLoginButton();
      const userNameInput = getters.getUserNameInput();
      const passwordInput = getters.getPasswordInput();
      //user entered inputs
      userEvent.type(userNameInput, 'test');
      userEvent.type(passwordInput, 'test');

      //user cleared one input field
      userEvent.clear(userNameInput);
      userEvent.click(document.body);

      //the button must become disabled
      expect(loginButton).toBeDisabled();
    });

    it('should show username is required when the user clears the input or leave the field empty', async () => {
      const userNameInput = getters.getUserNameInput();
      userEvent.type(userNameInput, 'test');
      userEvent.clear(userNameInput);
      userEvent.click(document.body);
      const validationMessage = await screen.findByText(
        /username is a required field!/i,
      );
      expect(validationMessage).toBeInTheDocument();
    });
  });

  describe('Basic Functionality', () => {
    const mockAuthenticateUser = authenticateUser as jest.MockedFunction<
      typeof authenticateUser
    >;

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should disable submit button while submitting', async () => {
      mockAuthenticateUser.mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(
              () => resolve({ authentication: 'token', userType: 'User' }),
              1000,
            ),
          ),
      );

      render(<LoginForm />);
      const loginButton = getters.getLoginButton();
      const userNameInput = getters.getUserNameInput();
      const passwordInput = getters.getPasswordInput();

      fireEvent.change(userNameInput, {
        target: { value: 'test' },
      });
      fireEvent.change(passwordInput, {
        target: { value: 'test123' },
      });
      fireEvent.click(loginButton);

      expect(loginButton).toBeDisabled();

      //wait for the button to be re-enabled after the mock promise resolves
      await waitFor(() => expect(loginButton).not.toBeDisabled(), {
        timeout: 1500,
      });
    });

    it('should call authenticateUser api with correct values when submitting login form', async () => {
      mockAuthenticateUser.mockResolvedValue({
        authentication: 'token',
        userType: 'User',
      });

      render(<LoginForm />);
      const loginButton = getters.getLoginButton();
      const userNameInput = getters.getUserNameInput();
      const passwordInput = getters.getPasswordInput();

      fireEvent.change(userNameInput, {
        target: { value: 'test' },
      });
      fireEvent.change(passwordInput, {
        target: { value: 'test123' },
      });
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(mockAuthenticateUser).toHaveBeenCalledWith('test', 'test123');
      });
    });

    it('should show error notification on login failure attempt', async () => {
      mockAuthenticateUser.mockRejectedValue(new Error('Invalid credentials'));

      render(<LoginForm />);
      const loginButton = getters.getLoginButton();
      const userNameInput = getters.getUserNameInput();
      const passwordInput = getters.getPasswordInput();

      fireEvent.change(userNameInput, {
        target: { value: 'test' },
      });
      fireEvent.change(passwordInput, {
        target: { value: 'test123' },
      });
      fireEvent.click(loginButton);

      expect(
        await screen.findByText(
          'Login failed. Please check your credentials and try again.',
        ),
      ).toBeInTheDocument();
    });
  });
});
