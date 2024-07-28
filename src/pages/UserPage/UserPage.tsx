import React, { FC } from "react";
import Header from "../../components/home/Header/Header";
import Footer from "../../components/home/Footer/Footer";
import classes from "./UserPage.module.css";
import { Outlet } from "react-router-dom";
import { SearchProvider } from "../../context/searchProvider";

const UserPage: FC = () => {
  return (
    <SearchProvider>
      <div>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </SearchProvider>
  );
};

export default UserPage;
