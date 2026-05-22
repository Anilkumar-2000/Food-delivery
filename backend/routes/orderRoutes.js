import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import {
  placeOrder,
  userOrders,
  verifyOrder,
  ordersList,
  updateStatus,
} from '../controllers/orderController.js';
const orderRouter = express.Router();

orderRouter.post('/place', authMiddleware, placeOrder);
orderRouter.post('/verify', verifyOrder);
orderRouter.post('/userorder', authMiddleware, userOrders);
orderRouter.get('/list', ordersList); // for Admin
orderRouter.post('/status', updateStatus);

export default orderRouter;
