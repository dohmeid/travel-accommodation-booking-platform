import React, { FC } from "react";
import classes from "./LoginPage.module.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup"; //Yup for object schema validation

// the yup module schema for validation
const schema = Yup.object().shape({
  username: Yup.string().required("Username is a required field!"),
  password: Yup.string().required("Password is a required field!"),
});

const LoginPage: FC = () => {
  return (
    <div className={classes.container}>
      <div className={classes.headline}>
        <h1>
          Travel<span>Hub</span>
        </h1>
        <p>
          Welcome to Travel Hub: Your Ultimate Gateway to Unforgettable
          Adventures!
        </p>
      </div>

      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
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
                aria-describedby="usernameAlert"
              />
              <ErrorMessage name="username" className={classes.errorAlert} />
            </div>

            <div className={classes.inputContainer}>
              <label htmlFor="password" className={classes.label}>
                Password
              </label>
              <Field
                type="password"
                name="password"
                aria-describedby="passwordAlert"
              />
              <ErrorMessage name="password" className={classes.errorAlert} />
            </div>

            <button type="submit" disabled={formik.isSubmitting}>
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
