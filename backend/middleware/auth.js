import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({ success: false, message: 'Token not provided' });
  }

  try {
    const tokenDecode = await jwt.verify(token, process.env.JWT_SECRET);

    if (!tokenDecode) {
      return res.json({ success: false, message: 'Invalid user' });
    }

    req.body.userId = tokenDecode.userId;

    console.log('from authmiddleware', req.body.userId);

    next();
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
