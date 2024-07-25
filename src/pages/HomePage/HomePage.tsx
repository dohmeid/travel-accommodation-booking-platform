import React, { FC } from "react";
import LandingSection from "../../components/home/LandingSection/LandingSection";
import FeaturedDeals from "../../components/home/FeaturedDeals/FeaturedDeals";
import TrendingDestinations from "../../components/home/TrendingDestinations/TrendingDestinations";
import RecentHotels from "../../components/home/RecentHotels/RecentHotels";
import classes from "./HomePage.module.css";

const HomePage: FC = () => {
  return (
    <div className={classes.homePage}>
      <LandingSection />
      <FeaturedDeals />
      <TrendingDestinations />
      <RecentHotels />
    </div>
  );
};

export default HomePage;
