import React, { useState, FC } from "react";
import classes from "./AdminPage.module.css";
import Header from "./Header/Header";
import Navigator from "./Navigator/Navigator";
import SearchBar from "./SearchBar/SearchBar";

const AdminPage: FC = () => {
  return (
    <div className={classes.container}>
      <Header />

      <div className={classes.flexContainer}>
        <Navigator />

        <div className={classes.body}>
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
