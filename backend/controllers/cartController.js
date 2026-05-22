import userModel from '../models/userModel.js';

export const addToCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);

    const cartData = await user.cartData;

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: 'Item added to cart' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);
    const cartData = await user.cartData;

    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: 'Remove from cart' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);
    const cartData = await user.cartData;

    res.json({ success: true, data: cartData, message: 'cart data retrived' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
