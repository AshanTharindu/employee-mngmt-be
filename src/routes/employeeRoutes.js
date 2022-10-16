import { Router } from 'express';
import * as employeeController from '../controllers/employeeController';

const router = Router();
router.get('/', employeeController.getEmployees);
router.post('/', employeeController.registerEmployee);


export default router;
