import React, { useState, useEffect, FC } from "react";
import classes from "./LoginPage.module.css";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup"; //Yup for object schema validation
import axios from "axios";

interface LoginFormValues {
  username: string;
  password: string;
  api?: string;
}

// the yup module schema for validation
const schema = Yup.object().shape({
  username: Yup.string().required("Username is a required field!"),
  password: Yup.string().required("Password is a required field!"),
});

const API_BASE_URL =
  "https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net";
const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
const API_URL =
  "https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/auth/authenticate";

const LoginPage: FC = () => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmitForm = async (
    values: LoginFormValues,
    { setSubmitting, setErrors }: FormikHelpers<LoginFormValues>
  ) => {
    /*setTimeout(() => {
      //alert(JSON.stringify(values.username, null, 1));
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);*/

    let name = values.username;
    let pass = values.password;
    console.log("name = " + name);
    console.log("pass = " + pass);

    try {
      const response = await apiService.post("/api/auth/authenticate", {
        userName: name,
        password: pass,
      });

      if (response.status === 200) {
        setMessage("Success");
        console.log("Authentication successful:", response);

        const { authentication, userType } = response.data;
        console.log(response.data);
        console.log("token = " + authentication);
        console.log("userType = " + userType);

        // Save token and userType in localStorage
        //localStorage.setItem("authToken", token);
        //localStorage.setItem("userType", userType);

        //Redirect or perform other actions after successful login
        alert("Login successful!");
      } else {
        //response.status === 401;
        setMessage("Unauthorized");
        console.log("Login failed. Please try again.");
      }
    } catch (error) {
      setMessage("No Server Response");
      setMessage("Login Failed");
      console.error("Authentication failed:", error);
      setErrors({
        api: "Login failed. Please check your credentials and try again.",
      });
    } finally {
      setSubmitting(false);
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
        onSubmit={handleSubmitForm}
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
              <ErrorMessage name="username" className={classes.errorAlert} />
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
              <ErrorMessage name="password" className={classes.errorAlert} />
            </div>

            {formik.errors.api && (
              <div style={{ color: "red" }}>{formik.errors.api}</div>
            )}

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
