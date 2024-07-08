import React, { FC, useState } from "react";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import { loginSchema, initialLoginValues } from "./LoginSchema";
import { authenticateUser } from "../../services/Api/Api";
import { LoginFormValues, Props } from "../../interfaces/auth";
import classes from "./LoginForm.module.css";

const LoginForm: FC<Props> = ({ onSubmitSuccess }) => {
  const [authMessage, setAuthMessage] = useState("");

  const handleSubmitForm = async (
    values: LoginFormValues,
    { setSubmitting, setErrors }: FormikHelpers<LoginFormValues>
  ) => {
    try {
      const responseData = await authenticateUser(
        values.username,
        values.password
      );

      const { authentication, userType } = responseData;
      console.log("token = " + authentication);
      console.log("userType = " + userType);

      // Save token and userType in localStorage
      //localStorage.setItem("authToken", token);
      //localStorage.setItem("userType", userType);

      setAuthMessage("Login successful");
      console.log("Login successful!");

      onSubmitSuccess(userType);
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
      onSubmit={handleSubmitForm}
      className={classes.loginForm}
    >
      {(formik) => (
        <Form
          aria-labelledby="log-in information"
          className={classes.loginForm}
        >
          <div className={classes.inputContainer}>
            <label htmlFor="username" className={classes.label}>
              Username
            </label>
            <Field
              type="text"
              name="username"
              id="username"
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
            <label htmlFor="password" className={classes.label}>
              Password
            </label>
            <Field
              type="password"
              name="password"
              id="password"
              aria-describedby="passwordAlert"
            />
            <ErrorMessage
              name="password"
              component="div"
              className={classes.errorAlert}
            />
          </div>

          {formik.errors.api && (
            <div style={{ color: "red" }}>{formik.errors.api}</div>
          )}

          <button type="submit" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? "Logging in..." : "Login"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
