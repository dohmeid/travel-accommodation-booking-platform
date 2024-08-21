import React, { FC } from 'react';
import Cart from '../../components/checkout/Cart/Cart';
import CheckoutForm from '../../components/checkout/CheckoutForm/CheckoutForm';
import classes from './CheckoutPage.module.css';

const CheckoutPage: FC = () => {
  return (
    <div className={classes.checkoutPageContainer}>
      <Cart />
      <CheckoutForm />
    </div>
  );
};

export default CheckoutPage;
