import { Router } from 'express';
import * as commentController from '../controllers/commentController';
import { authenticate } from '../middlewares/authHandler';

const router = Router({ mergeParams: true });

router.post('/', authenticate, commentController.addComment);

export default router;
