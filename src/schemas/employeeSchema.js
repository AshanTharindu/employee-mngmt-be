import mongoose from 'mongoose';

const { Schema } = mongoose;

/**
 * Employee schema 
 */
export const employeeSchema = new Schema({
  username: { type: String, required: true, unique: true }, // username should be unique
  email: { type: String, required: true, unique: true ,     validate: {
    // custom validator for validating email
    validator: (_email) => {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(_email);
    },
    message: props => `${props.value} is not a valid email!`
  },},
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  // only defined roles are allowed
  role: { type: String, required: true, enum: ['admin', 'writer', 'reader'] },
});
