import React, { FC, useState } from "react";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { LoginFormValues } from "../../types/auth";
import { authenticateUser } from "../../services/authApi";
import { useAuthContext } from "../../context/authProvider";
import Snackbar from "../shared/Snackbar/Snackbar";
import classes from "./LoginForm.module.css";

const loginSchema = Yup.object().shape({
  username: Yup.string().required("Username is a required field!"),
  password: Yup.string().required("Password is a required field!"),
});

const initialLoginValues = {
  username: "",
  password: "",
};

const LoginForm: FC = () => {
  const { handleLoginSuccess } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmitLoginForm = async (
    values: LoginFormValues,
    { setSubmitting, setErrors }: FormikHelpers<LoginFormValues>
  ) => {
    try {
      const { authentication, userType } = await authenticateUser(
        values.username,
        values.password
      );
      handleLoginSuccess(authentication, userType);
    } catch (error: any) {
      setErrors({
        api: "Login failed. Please check your credentials and try again.",
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
              type={showPassword ? "text" : "password"}
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
                onChange={() => setShowPassword(!showPassword)}
              />
              {showPassword ? (
                <i className="bi bi-eye-fill"></i>
              ) : (
                <i className="bi bi-eye-slash-fill"></i>
              )}
            </label>
          </div>

          <button
            type="submit"
            className={classes.loginButton}
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {formik.isSubmitting ? "Logging in..." : "Login"}
          </button>

          {formik.errors.api && <Snackbar message={formik.errors.api} />}
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
