import { Router } from 'express';
import employeeRoutes from './routes/employeeRoutes'
import commentRoutes from './routes/commentRoutes'
import loginRoutes from './routes/loginRoutes'

const router = Router();

router.use('/employees/:empId/comments', commentRoutes);
router.use('/employees', employeeRoutes);
router.use('/login', loginRoutes);

export default router;