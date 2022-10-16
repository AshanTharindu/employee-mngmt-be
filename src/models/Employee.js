import mongoose from 'mongoose';
import { employeeSchema } from '../schemas/employeeSchema';

export const Employee = mongoose.model('Employee', employeeSchema);
