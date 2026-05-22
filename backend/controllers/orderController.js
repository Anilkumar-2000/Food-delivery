import userModel from '../models/userModel.js';
import orderModel from '../models/orderModel.js';
import Stripe from 'stripe';

export const placeOrder = async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const frontend_url = 'http://localhost:5173';

  try {
    const newOrder = new orderModel({
      userId: req.body.userId, // Id will get from authMiddleware
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 80,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: 'inr',
        product_data: {
          name: 'Delivery Charges',
        },
        unit_amount: 2 * 100 * 80,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: 'payment',
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url, orderId: newOrder._id });
  } catch (error) {
    console.log(error);
    res.json({ success: false, messsage: error.messsage });
  }
};

export const verifyOrder = async (req, res) => {
  const { success, orderId } = req.body;
  try {
    if (success == 'true') {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: 'Paid' });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: 'Not Paid' });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
// Specific user order

export const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders, message: 'Orders retrived' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// All Orders list for Admin

export const ordersList = async (req, res) => {
  try {
    const ordersList = await orderModel.find({});
    res.json({ success: true, message: 'Orders retrived', orders: ordersList });
  } catch (error) {
    res.json({ success: false, messgae: error.message });
  }
};

// update Status

export const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
    res.json({ success: true, message: 'Status updated' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
