import mongoose from 'mongoose';

const { Schema } = mongoose;

/**
 * Employee schema
 */
export const employeeSchema = new Schema({
  username: { type: String, unique: true }, // username should be unique
  password: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
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
  role: { type: String, required: true},
  registered: {type: Number, enum: [0,1]},
  // 1: true, 0: false
  archived: { type: Number, require: true, enum: [0, 1], default: 0 },
});
