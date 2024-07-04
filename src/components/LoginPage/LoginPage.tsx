import React, { useState, FC } from "react";
import classes from "./LoginPage.module.css";

const LoginPage: FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setValid] = useState(false);

  /*
  const setText = event => {
    event.target.name === "name"
      ? setUsername(event.target.value)
      : setPassword(event.target.value);
  };

  const validate = () => {
    setValid(!!username && !!password);
    if (!username) {
      document.querySelector("#username").focus();
    } else if (!password) {
      document.querySelector("#password").focus();
    }
  };*/

  const submitFormHandler = (e: any) => {
    e.preventDefault();
    //validate();
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

      <form
        aria-labelledby="log-in information"
        className={classes.loginForm}
        onSubmit={submitFormHandler}
      >
        <div className={classes.inputContainer}>
          <label
            htmlFor="userName"
            className={`${classes.label} ${!isValid ? classes.error : ""}`}
          >
            Username
          </label>
          <input
            className={`${!isValid ? classes.errorBorder : ""}`}
            type="text"
            name="userName"
            id="userName"
            aria-required="true"
            aria-describedby="usernameAlert"
          />
          {!isValid && !username && (
            <div
              role="alert"
              aria-atomic="true"
              id="usernameAlert"
              className={classes.alert}
            >
              You must enter a valid username
            </div>
          )}
        </div>

        <div className={classes.inputContainer}>
          <label
            htmlFor="password"
            className={`${classes.label} ${!isValid ? classes.error : ""}`}
          >
            Password
          </label>
          <input
            className={`${!isValid ? classes.errorBorder : ""}`}
            type="password"
            name="password"
            id="password"
            aria-required="true"
            aria-describedby="passwordAlert"
          />
          {!isValid && !password && (
            <div
              aria-live="polite"
              role="alert"
              aria-atomic="true"
              id="passwordAlert"
              className={classes.alert}
            >
              You must enter a valid password
            </div>
          )}
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
