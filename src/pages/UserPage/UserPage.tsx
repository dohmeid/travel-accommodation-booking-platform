import React, { FC } from "react";
import Header from "../../components/home/Header/Header";
import Footer from "../../components/home/Footer/Footer";
import classes from "./UserPage.module.css";
import { Outlet } from "react-router-dom";
import { SearchProvider } from "../../context/searchProvider";
import { HotelProvider } from "../../context/hotelProvider";
import { CartProvider } from "../../context/cartProvider";

const UserPage: FC = () => {
  return (
    <SearchProvider>
      <HotelProvider>
        <CartProvider>
          <div className={classes.userPage}>
            <Header />
            <Outlet />
            <Footer />
          </div>
        </CartProvider>
      </HotelProvider>
    </SearchProvider>
  );
};

export default UserPage;
