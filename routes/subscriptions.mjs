import express from 'express';
import SubscriptionController from '../controllers/subscriptionController.mjs';
import { authenticate } from '../middleware/authMiddleware.mjs';

const router = express.Router();

router.use(authenticate);

router.get('/', SubscriptionController.getSubscriptions);
router.post('/', SubscriptionController.addSubscription);

export default router;