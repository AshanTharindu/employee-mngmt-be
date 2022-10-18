import { Router } from 'express';
import * as employeeController from '../controllers/employeeController';
import { authenticate } from '../middlewares/authHandler';

const router = Router();
router.get('/', authenticate, employeeController.getEmployees);
router.post('/', employeeController.registerEmployee);


export default router;
