import React from 'react';
import axios from 'axios';
import './Order.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { assets } from '../../../../frontend/src/assets/assets';
import { toast } from 'react-hot-toast';
const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.get(`${url}/api/order/list`, {});
    console.log(response);

    if (response.data.success) {
      console.log('from orders', response.data.orders);
      toast.success(response.data.message);
      setOrders(response.data.orders);
    }
  };

  const statusHandler = async (status, orderId) => {
    const response = await axios.post(`${url}/api/order/status`, { status, orderId });

    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error('Error');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div className="orders add">
      <h2>Order Page</h2>
      <div className="order-list">
        {orders.map((order, index) => {
          return (
            <div className="my-orders-order" key={index}>
              <img className="order-item-image" alt="" src={assets.parcel_icon} />
              <div>
                <p className="order-food-item">
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + ' X ' + item.quantity;
                    } else {
                      return item.name + ' X ' + item.quantity + ',  ';
                    }
                  })}
                </p>
                <p className="order-item-name">
                  {order.address.firstName + ' ' + order.address.secondName}
                </p>
                <div className="order-item-address">
                  <p>
                    {order.address.street + ' , '}
                    {order.address.city +
                      ' , ' +
                      order.address.state +
                      ' , ' +
                      order.address.country +
                      ' , ' +
                      order.address.zipcode}
                  </p>
                </div>
                <p className="order-item-contact">Contact no: {order.address.contact}</p>
              </div>
              <p className="order-item-amount">${order.amount}.00</p>
              <p>{'Items: ' + order.items.length}</p>
              <select onChange={(event) => statusHandler(event.target.value, order._id)}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivered">Out for delivered</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Order;
