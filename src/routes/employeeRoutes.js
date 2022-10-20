import { Router } from 'express';
import * as employeeController from '../controllers/employeeController';
import { authenticate } from '../middlewares/authHandler';

const router = Router();
router.get('/', authenticate, employeeController.getEmployees);
router.post('/', employeeController.registerEmployee);
router.patch('/:id', employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);
router.post('/csv-import', employeeController.addEmployees);

export default router;
