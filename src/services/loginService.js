import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Employee } from '../models/Employee';

const loginUser = async ({ username, password }) => {
  const user = await Employee.findOne({ username });
  if (!user) throw new Error('user not found');
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return new Error('Email or password is wrong');

  //Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  return token;
};

export default { loginUser };
