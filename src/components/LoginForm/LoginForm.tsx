import React, { FC, useState } from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import { LoginFormValues } from '../../types/authTypes';
import { authenticateUser } from '../../api/authService';
import { useAuthContext } from '../../context/authProvider';
import { NotificationType } from '../../context/notificationProvider';
import { loginSchema } from '../../schemas/validationSchemas';
import Snackbar from '../shared/Snackbar/Snackbar';
import classes from './LoginForm.module.css';

const initialLoginValues = {
  username: '',
  password: '',
};

const LoginForm: FC = () => {
  const { handleLoginSuccess } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmitLoginForm = async (
    values: LoginFormValues,
    { setSubmitting, setErrors }: FormikHelpers<LoginFormValues>,
  ) => {
    try {
      const userData = await authenticateUser(values.username, values.password);
      handleLoginSuccess(userData);
    } catch {
      setErrors({
        api: 'Login failed. Please check your credentials and try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialLoginValues}
      validationSchema={loginSchema}
      onSubmit={handleSubmitLoginForm}
    >
      {(formik) => (
        <Form
          aria-labelledby="log-in information"
          className={classes.loginForm}
        >
          <div className={classes.inputContainer}>
            <Field
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              aria-describedby="usernameAlert"
              autoComplete="true"
            />
            <ErrorMessage
              name="username"
              component="div"
              className={classes.errorAlert}
            />
          </div>
          <div className={classes.inputContainer}>
            <Field
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              placeholder="Password"
              aria-describedby="passwordAlert"
            />
            <ErrorMessage
              name="password"
              component="div"
              className={classes.errorAlert}
            />
            <label className={classes.showPasswordLabel}>
              <input
                name="showPassword"
                id="showPassword"
                type="checkbox"
                checked={showPassword}
                aria-label="Show or hide password"
                onChange={() => setShowPassword(!showPassword)}
              />
              <i
                className={
                  showPassword ? 'bi bi-eye-fill' : 'bi bi-eye-slash-fill'
                }
              />
            </label>
          </div>

          <button
            type="submit"
            className={classes.loginButton}
            disabled={
              formik.isSubmitting ||
              !formik.isValid ||
              !formik.values.username ||
              !formik.values.password
            }
          >
            {formik.isSubmitting ? 'Logging in...' : 'Login'}
          </button>

          {formik.errors.api && (
            <Snackbar
              type={NotificationType.ERROR}
              message={formik.errors.api}
            />
          )}
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
