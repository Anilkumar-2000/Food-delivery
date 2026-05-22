import userModel from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import bcrypt from 'bcrypt';
import validator from 'validator';

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ success: false, message: 'All fields are required' });
  }

  try {
    const userAlreadyExits = await userModel.findOne({ email });

    if (userAlreadyExits) {
      res.json({ success: false, message: 'User Already Registered' });
    }

    if (!validator.isEmail(email)) {
      res.json({ success: false, message: 'Please enter valid email' });
    }

    if (password.length < 8) {
      res.json({ success: false, message: 'Please enter Strong a Password' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    const token = await generateToken(user._id);

    res.json({ success: true, message: 'User register successfully', token: token, user: user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: 'Invalid User. Register again' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.json({ success: false, message: 'Invalid Password' });
    }

    const token = await generateToken(user._id);

    res.json({ success: true, message: 'User LoggedIn Successfully', token: token });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
