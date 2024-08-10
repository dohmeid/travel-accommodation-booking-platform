import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import { SearchProvider } from "../../context/searchProvider";
import { CartProvider } from "../../context/cartProvider";
import { HomeProvider } from "../../context/homeProvider";
import { HotelProvider } from "../../context/hotelProvider";
import MainHeader from "../../components/common/MainHeader/MainHeader";
import Footer from "../../components/common/Footer/Footer";
import classes from "./UserPage.module.css";

const UserPage: FC = () => {
  return (
    <CartProvider>
      <HomeProvider>
        <SearchProvider>
          <HotelProvider>
            <div className={classes.userPage}>
              <MainHeader />
              <Outlet />
              <Footer />
            </div>
          </HotelProvider>
        </SearchProvider>
      </HomeProvider>
    </CartProvider>
  );
};

export default UserPage;
