import React, { FC } from "react";
import LeftNavigator from "../../components/admin/LeftNavigator/LeftNavigator";
import Header from "../../components/admin/Header/Header";
import SearchBar from "../../components/admin/SearchBar/SearchBar";
import Grid from "../../components/admin/Grid/Grid";
import classes from "./AdminPage.module.css";
import { Routes, Route, Link, Outlet } from 'react-router-dom';


const AdminPage: FC = () => {
  return (
    <div className={classes.adminPage}>
      <LeftNavigator />
      <div className={classes.main}>
        <Header />
        <section className={classes.body}>
          <SearchBar />

        
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default AdminPage;
/*

renders the matching child route with its respective component (here either Profile or Account component) from the parent Routes' component collection of Route components.
*/
