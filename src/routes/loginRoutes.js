import { Router } from 'express';
import * as loginController from '../controllers/loginController';

const router = Router();
/**
 * Login route
 */
router.post('/', loginController.login);


export default router;