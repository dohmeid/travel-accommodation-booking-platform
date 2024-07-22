import React, { FC } from "react";

import Header from "../../components/home/Header/Header";
import LandingSection from "../../components/home/LandingSection/LandingSection";
import FeaturedDeals from "../../components/home/FeaturedDeals/FeaturedDeals";
import Footer from "../../components/home/Footer/Footer";
import classes from "./HomePage.module.css";

const HomePage: FC = () => {
  return (
    <div className={classes.homePage}>
      <Header />
      <LandingSection />
      <FeaturedDeals />
      <Footer />
    </div>
  );
};

export default HomePage;
