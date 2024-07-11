import React, { FC, useContext } from "react";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import { loginSchema, initialLoginValues } from "./LoginSchema";
import { LoginFormValues } from "../../interfaces/auth";
import { authenticateUser } from "../../services/Api/Api";

import classes from "./LoginForm.module.css";
import { AuthenticationContext } from "../../context/authentication";
import { AuthenticationContextType } from "../../interfaces/auth";
import Snackbar from "../common/Snackbar/Snackbar";

const LoginForm: FC = () => {
  const { handleLoginSuccess } =
    useContext(AuthenticationContext) as AuthenticationContextType;

  const handleSubmitLoginForm = async (
    values: LoginFormValues,
    { setSubmitting,setErrors  }: FormikHelpers<LoginFormValues>
  ) => {
    try {
      const responseData = await authenticateUser(
        values.username,
        values.password
      );
      console.log("Login successful!");
      const { authenticationToken, userType } = responseData;
      console.log("token = " + authenticationToken);
      console.log("userType = " + userType);
      handleLoginSuccess(authenticationToken, userType);
    } catch (error: any) {
      console.log(error.message);
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
              type="password"
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
          </div>

          <div className={classes.rememberMeContainer}>
            <label htmlFor="rememberMe">Remember me</label>
            <input type="checkbox" name="rememberMe" id="rememberMe" />
          </div>

          <button
            type="submit"
            className={classes.loginButton}
            disabled={
              formik.isSubmitting ||
              !!formik.errors.password ||
              !!formik.errors.username
            }
          >
            {formik.isSubmitting ? "Logging in..." : "Login"}
          </button>

          {formik.errors.api && (
            <Snackbar message={formik.errors.api} />
          )}
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
