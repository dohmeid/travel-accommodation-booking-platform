import React, { useState, FC } from "react";
import classes from "./AdminPage.module.css";
import Navigator from "./Navigator/Navigator";
import SearchBar from "./SearchBar/SearchBar";

const AdminPage: FC = () => {
  return (
    <div className={classes.container}>
      <Navigator />

      <div className={classes.body}>
        <SearchBar />
      </div>
    </div>
  );
};

export default AdminPage;
