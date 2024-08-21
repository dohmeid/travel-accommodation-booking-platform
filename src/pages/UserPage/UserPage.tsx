import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { SearchProvider } from '../../context/searchProvider';
import { BookingProvider } from '../../context/bookingProvider';
import { HomeProvider } from '../../context/homeProvider';
import { HotelProvider } from '../../context/hotelProvider';
import { CartProvider } from '../../context/cartProvider';
import MainHeader from '../../components/shared/MainHeader/MainHeader';
import Footer from '../../components/shared/Footer/Footer';
import classes from './UserPage.module.css';

const UserPage: FC = () => {
  return (
    <HomeProvider>
      <SearchProvider>
        <HotelProvider>
          <CartProvider>
            <BookingProvider>
              <div className={classes.userPage}>
                <MainHeader />
                <Outlet />
                <Footer />
              </div>
            </BookingProvider>
          </CartProvider>
        </HotelProvider>
      </SearchProvider>
    </HomeProvider>
  );
};

export default UserPage;
