import { Router } from 'express';
import employeeRoutes from './routes/employeeRoutes'

const router = Router();

router.use('/employees', employeeRoutes);

export default router;