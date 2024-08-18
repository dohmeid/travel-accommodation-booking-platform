import React, { FC } from 'react';
import { useCartContext } from '../../../context/cartProvider';
import CartItem from './CartItem/CartItem';
import classes from './Cart.module.css';

const Cart: FC = () => {
  const { cartItems, getTotalPrice } = useCartContext();

  const CART_LIST = cartItems.map((item) => (
    <CartItem key={item.roomId} room={item} />
  ));

  return (
    <div className={classes.cartContainer}>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className={classes.noItems}>
          No rooms booked yet
          <i className="bi bi-emoji-frown" />
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
