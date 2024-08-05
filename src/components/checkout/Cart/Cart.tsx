import React, { useState, FC, useEffect } from "react";
import classes from "./Cart.module.css";
import { useCartContext } from "../../../context/cartProvider";
import CartItem from "./CartItem/CartItem";

const Cart: FC = () => {
  const { cartItems, getTotalPrice } = useCartContext();

  //rendering the cart items list
  const CART_LIST = cartItems.map((item) => (
    <CartItem key={item.roomId} room={item} />
  ));

  return (
    <div className={classes.cartContainer}>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className={classes.noItems}>
          No rooms booked yet 
          <i className="bi bi-emoji-frown"></i>
        </p>
      ) : (
        <ul>{CART_LIST}</ul>
      )}

      <div className={classes.info}>
        <p>{cartItems.length} items</p>
        <p>Grand Total = ${getTotalPrice()}</p>
      </div>
    </div>
  );
};

export default Cart;
