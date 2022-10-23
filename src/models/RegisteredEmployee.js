import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { registeredEmployeeSchema } from '../schemas/registeredEmployeeSchema';

/**
 * Registered employee model functionlity
 * @returns 
 */

/**
 * Handles employe object keys
 * @returns Registered employee object
 */
registeredEmployeeSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;

  return userObject;
};

/**
 * Find the user by credentials
 * @param {*} username 
 * @param {*} password 
 * @returns Registered employee object
 */
registeredEmployeeSchema.statics.findByCredentials = async (
  username,
  password
) => {
  const user = await RegisteredEmployee.findOne({ username });

  if (!user) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login');
  }

  return user;
};

/**
 * Genereate auth token upon successful login
 * @returns 
 */
registeredEmployeeSchema.methods.generateAuthToken = function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

  return token;
};

export const RegisteredEmployee = mongoose.model(
  'RegisteredEmployee',
  registeredEmployeeSchema
);
