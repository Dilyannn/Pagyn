import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const registerUserService = async (userData) => {
  const { username, email, password } = userData;

  const existingUser = await User.find({ $or: [{ email }, { username }] });
  if (existingUser.length > 0) {
    throw new Error('Username or email already exists');
  }

  const user = new User({ username, email, password });
  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '10d',
  });

  return { user, token };
};
