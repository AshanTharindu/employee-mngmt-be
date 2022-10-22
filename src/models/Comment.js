import mongoose from 'mongoose';
import { commentSchema } from '../schemas/commentSchema';

export const Comment = mongoose.model('Comment', commentSchema);
