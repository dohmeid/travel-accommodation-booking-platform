import React, { FC } from "react";

import Header from "../../components/home/Header/Header";
import SearchBar from "../../components/home/SearchBar/SearchBar";
import Footer from "../../components/home/Footer/Footer";
import classes from "./HomePage.module.css";

const HomePage: FC = () => {
  return (
    <div className={classes.homePage}>
      <Header />
      <SearchBar />
      <Footer />
    </div>
  );
};

export default HomePage;
