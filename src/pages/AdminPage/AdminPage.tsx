import React, { FC } from "react";
import classes from "./AdminPage.module.css";
import LeftNavigator from "../../components/admin/LeftNavigator/LeftNavigator";
import Header from "../../components/admin/Header/Header";
import SearchBar from "../../components/admin/SearchBar/SearchBar";
import TableGrid from "../../components/admin/TableGrid/TableGrid";

const AdminPage: FC = () => {
  return (
    <div className={classes.adminPage}>
      <LeftNavigator />
      <div className={classes.main}>
        <Header />
        <section className={classes.body}>
          <SearchBar />
          <TableGrid />
        </section>
      </div>
    </div>
  );
};

export default AdminPage;
