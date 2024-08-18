import React, { FC } from 'react';
import ScrollToTopButton from '../../components/shared/ScrollToTopButton/ScrollToTopButton';
import LandingView from '../../components/home/LandingView/LandingView';
import FeaturedDeals from '../../components/home/FeaturedDeals/FeaturedDeals';
import TrendingDestinations from '../../components/home/TrendingDestinations/TrendingDestinations';
import RecentHotels from '../../components/home/RecentHotels/RecentHotels';
import classes from './HomePage.module.css';

const HomePage: FC = () => {
  return (
    <div className={classes.homePage}>
      <ScrollToTopButton />
      <LandingView />
      <FeaturedDeals />
      <TrendingDestinations />
      <RecentHotels />
    </div>
  );
};

export default HomePage;
