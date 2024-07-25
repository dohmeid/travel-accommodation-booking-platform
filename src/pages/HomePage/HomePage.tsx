import React, { FC } from "react";
import ScrollToTopButton from "../../components/common/ScrollToTopButton/ScrollToTopButton";
import LandingSection from "../../components/home/LandingSection/LandingSection";
import FeaturedDeals from "../../components/home/FeaturedDeals/FeaturedDeals";
import TrendingDestinations from "../../components/home/TrendingDestinations/TrendingDestinations";
import RecentHotels from "../../components/home/RecentHotels/RecentHotels";
import classes from "./HomePage.module.css";

const HomePage: FC = () => {
  return (
    <div className={classes.homePage}>
      <ScrollToTopButton />
      <LandingSection />
      <FeaturedDeals />
      <TrendingDestinations />
      <RecentHotels />
    </div>
  );
};

export default HomePage;
