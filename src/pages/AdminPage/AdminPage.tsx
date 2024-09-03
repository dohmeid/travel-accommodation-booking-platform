import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminProvider } from '../../context/adminProvider';
import LeftNavigator from '../../components/admin/LeftNavigator/LeftNavigator';
import Header from '../../components/admin/Header/Header';
import classes from './AdminPage.module.css';

const AdminPage: FC = () => {
  return (
    <AdminProvider>
      <div className={classes.adminPage}>
        <LeftNavigator />
        <div className={classes.main}>
          <Header />
          {/*Outlet renders the Body element based on type = (gridType = city or hotel or room) */}
          <Outlet />
        </div>
      </div>
    </AdminProvider>
  );
};

export default AdminPage;
