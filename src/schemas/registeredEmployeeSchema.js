import mongoose from 'mongoose';
import { commentSchema } from './commentSchema';

const { Schema } = mongoose;

/**
 * Employee schema
 */
export const registeredEmployeeSchema = new Schema({
  username: { type: String, required: true, unique: true }, // username should be unique
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      // custom validator for validating email
      validator: (_email) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(_email);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  address: { type: String, required: true },
  role: { type: String, required: true },
  comments: [commentSchema],
  // 1: true, 0: false
  archived: { type: Number, require: true, enum: [0, 1], default: 0 },
});
