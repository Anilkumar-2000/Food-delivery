import React, { useEffect } from 'react';
import './PlaceOrder.css';
import { useContext } from 'react';

import { useNavigate } from 'react-router-dom';

import { StoreContext } from '../../context/storeContext';
import { useState } from 'react';
import axios from 'axios';

const PlaceOrder = () => {
  const naviagte = useNavigate();
  const { getCartTotalAmount, token, cartItems, food_list, url } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: '',
    secondName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    contact: '',
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    let orderItems = [];

    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo['quantity'] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    const orderData = {
      items: orderItems,
      address: data,
      amount: getCartTotalAmount() + 2,
    };

    const response = await axios.post(`${url}/api/order/place`, orderData, { headers: { token } });

    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert('Error');
    }
  };

  useEffect(() => {
    if (!token) {
      naviagte('/cart');
    } else if (getCartTotalAmount() === 0) {
      naviagte('/cart');
    }
  }, []);

  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="place-order-left">
        <h2>Delivery Information</h2>
        <div className="multi-fields">
          <input
            required
            type="text"
            placeholder="First Name"
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
          />
          <input
            required
            type="text"
            placeholder="Second Name"
            name="secondName"
            onChange={onChangeHandler}
            value={data.secondName}
          />
        </div>
        <input
          required
          type="text"
          placeholder="Email"
          name="email"
          onChange={onChangeHandler}
          value={data.email}
        />
        <input
          required
          type="text"
          placeholder="Street"
          name="street"
          onChange={onChangeHandler}
          value={data.street}
        />
        <div className="multi-fields">
          <input
            required
            type="text"
            placeholder="City"
            name="city"
            onChange={onChangeHandler}
            value={data.city}
          />
          <input
            type="text"
            placeholder="State"
            name="state"
            onChange={onChangeHandler}
            value={data.state}
          />
        </div>
        <div className="multi-fields">
          <input
            required
            type="number"
            placeholder="Zipcode"
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
          />
          <input
            required
            type="text"
            placeholder="Country"
            name="country"
            onChange={onChangeHandler}
            value={data.country}
          />
        </div>
        <input
          required
          type="number"
          placeholder="Contact Number"
          name="contact"
          onChange={onChangeHandler}
          value={data.contact}
        />
      </div>
      <div className="place-order-right">
        <div className="orders-cart-totals">
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
        <button className="orders-checkout-btn" type="submit" onChange={placeOrder}>
          PROCEED TO CHECKOUT
        </button>
      </div>
    </form>
  );
};

export default PlaceOrder;
