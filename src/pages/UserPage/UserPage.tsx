import React, { FC } from "react";
import Header from "../../components/home/Header/Header";
import Footer from "../../components/home/Footer/Footer";
import classes from "./UserPage.module.css";
import { Outlet } from "react-router-dom";

const UserPage: FC = () => {
  return (
    <div className={classes.userPage}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default UserPage;
