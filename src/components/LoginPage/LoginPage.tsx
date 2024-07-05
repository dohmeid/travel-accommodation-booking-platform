import React, { useState, FC } from "react";
import classes from "./LoginPage.module.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup"; //Yup for object schema validation
import axios from "axios";

// the yup module schema for validation
const schema = Yup.object().shape({
  username: Yup.string().required("Username is a required field!"),
  password: Yup.string().required("Password is a required field!"),
});

const API_URL =
  "https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/auth/authenticate";

const LoginPage: FC = () => {
  const [message, setMessage] = useState("");

  ////////////////
  const submitFrom = async () => {
    try {
      const response = await axios.post(
        API_URL,
        JSON.stringify({ userName: "user2", password: "user2" }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      //setAuth({ user, pwd, roles, accessToken });

      setMessage("Success");
    } catch (error: any) {
      if (!error?.response) {
        setMessage("No Server Response");
      } else if (error.response?.status === 401) {
        setMessage("Unauthorized");
      } else {
        setMessage("Login Failed");
      }
    }
  };

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
