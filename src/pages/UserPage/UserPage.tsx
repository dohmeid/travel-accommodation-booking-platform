import React, { FC } from "react";
import MainHeader from "../../components/common/MainHeader/MainHeader";
import Footer from "../../components/common/Footer/Footer";
import classes from "./UserPage.module.css";
import { Outlet } from "react-router-dom";
import { SearchProvider } from "../../context/searchProvider";
import { HotelProvider } from "../../context/hotelProvider";
import { CartProvider } from "../../context/cartProvider";
import { HomeProvider } from "../../context/homeProvider";

const UserPage: FC = () => {
  return (
    <SearchProvider>
      <HotelProvider>
        <CartProvider>
          <HomeProvider>
            <div className={classes.userPage}>
              <MainHeader />
              <Outlet />
              <Footer />
            </div>
          </HomeProvider>
        </CartProvider>
      </HotelProvider>
    </SearchProvider>
  );
};

export default UserPage;
