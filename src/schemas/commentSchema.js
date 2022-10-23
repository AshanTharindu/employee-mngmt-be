import mongoose from 'mongoose';

const { Schema } = mongoose;

/**
 * Comment schema
 */
export const commentSchema = new Schema({
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now() },
  author: { type: Schema.Types.ObjectId, ref: 'RegisteredEmployee' }
});
