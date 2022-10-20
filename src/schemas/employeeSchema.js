import mongoose from 'mongoose';

const { Schema } = mongoose;

/**
 * Employee schema
 */
export const employeeSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  address: { type: String, required: true },
  role: { type: String, required: true},
  // 1: true, 0: false
  archived: { type: Number, require: true, enum: [0, 1], default: 0 },
});
