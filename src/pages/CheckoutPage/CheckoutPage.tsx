import React, { useState, FC } from "react";
import classes from "./CheckoutPage.module.css";
import Cart from "../../components/checkout/Cart/Cart";
import CheckoutForm from "../../components/checkout/CheckoutForm/CheckoutForm";

const CheckoutPage: FC = () => {
  return (
    <div className={classes.checkoutPageContainer}>
      <Cart />
      <CheckoutForm />
    </div>
  );
};

export default CheckoutPage;
