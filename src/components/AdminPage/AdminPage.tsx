import React, { useState, FC } from "react";
import classes from "./AdminPage.module.css";
import Header from "./Header/Header";
import Navigator from "./Navigator/Navigator";
import ControlBar from "./ControlBar/ControlBar";
import TableGrid from "./TableGrid/TableGrid";

const AdminPage: FC = () => {
  return (
    <div className={classes.container}>
      <Header />

      <div className={classes.flexContainer}>
        <Navigator />

        <div className={classes.body}>
          <ControlBar />
          <TableGrid/>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
