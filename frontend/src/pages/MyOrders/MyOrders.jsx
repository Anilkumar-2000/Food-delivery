import React from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { StoreContext } from '../../context/storeContext.jsx';
import './MyOrders.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { assets } from '../../assets/assets.js';

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { url, token } = useContext(StoreContext);

  const getMyOrders = async () => {
    const response = await axios.post(`${url}/api/order/userorder`, {}, { headers: { token } });

    if (response.data.success) {
      console.log(response.data.data);
      setMyOrders(response.data.data);
      console.log(response.data.data);
    }
  };

  useEffect(() => {
    getMyOrders();
  }, []);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {myOrders.map((order, index) => {
          return (
            <div className="my-orders-order" key={index}>
              <img alt="" src={assets.parcel_icon} />
              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + ' X ' + item.quantity;
                  } else {
                    return item.name + ' X ' + item.quantity + ',  ';
                  }
                })}
              </p>
              <p>${order.amount}.00</p>
              <p>{'items: ' + order.items.length}</p>
              <p>
                <span>&#x25cf;</span> <b>{order.status}</b>
              </p>
              {/* <p>{order.address.firstName + ' ' + order.address.secondName}</p> */}
              <button onClick={getMyOrders}>Track Order</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
