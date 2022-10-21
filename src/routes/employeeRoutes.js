import { Router } from 'express';
import * as employeeController from '../controllers/employeeController';
import { authenticate } from '../middlewares/authHandler';

const router = Router();
router.get('/', authenticate, employeeController.getEmployees);
router.post('/', employeeController.registerEmployee);
router.patch('/:id', authenticate, employeeController.updateEmployee);
router.delete('/:id', authenticate, employeeController.deleteEmployee);
router.post('/csv-import', authenticate, employeeController.addEmployees);

export default router;
