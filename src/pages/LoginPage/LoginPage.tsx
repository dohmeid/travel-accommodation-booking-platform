import React, { useState, FC } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import classes from "./LoginPage.module.css";

const LoginPage: FC = () => {
  //const [authMessage, setAuthMessage] = useState("");
  const navigate = useNavigate();

  const handleLoginSuccess = (userType: string) => {
    if (userType === "User") {
      console.log("This is a user");
      navigate("/home");
    } else if (userType === "Admin") {
      console.log("This is an Admin");
      navigate("/adminPortal");
    } else {
      console.log("Unknown user type");
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
      <LoginForm onSubmitSuccess={handleLoginSuccess} />
    </div>
  );
};

export default LoginPage;
