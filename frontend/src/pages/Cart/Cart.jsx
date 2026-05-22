import React, { useContext } from 'react';
import { StoreContext } from '../../context/storeContext';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getCartTotalAmount, url } =
    useContext(StoreContext);
  console.log(cartItems);

  const naviagte = useNavigate();

  return (
    <div className="cart-items">
      <div className="cart-items-titles">
        <p>Items</p>
        <p className="title">Title</p>
        <p className="price">Price</p>
        <p className="quantity">Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <br />
      <hr />
      {food_list.map((item, index) => {
        if (cartItems?.[item._id] > 0) {
          return (
            <div key={index}>
              <div className="cart-items-titles cart-Items-item">
                <img src={url + '/images/' + item.image} />
                <p>{item.name}</p>
                <p className="price">{item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>{item.price * cartItems[item._id]}</p>
                <p className="cart-cancel-btn" onClick={() => removeFromCart(item._id)}>
                  X
                </p>
              </div>
              <hr />
            </div>
          );
        }
      })}

      <div className="cart-totals-and-promocode">
        <div className="cart-totals">
          <h2>Cart Totals</h2>
          <div className="cart-total-info">
            <p>Subtotals</p>
            <p>${getCartTotalAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-info">
            <p>Delivery Fees</p>
            <p>${getCartTotalAmount() ? 2 : 0}</p>
          </div>
          <hr />
          <div className="cart-total-info">
            <b>Total</b>
            <b>${getCartTotalAmount() ? 2 + getCartTotalAmount() : 0}</b>
          </div>
        </div>
        <div className="cart-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cart-promocode-input-and-button">
            <input type="text" placeholder="Enter your promocode" className="promocode-input" />
            <button>Submit</button>
          </div>
        </div>
      </div>

      <button className="checkout-btn" type="button" onClick={() => naviagte('/order')}>
        PROCEED TO CHECKOUT
      </button>
    </div>
  );
};

export default Cart;
