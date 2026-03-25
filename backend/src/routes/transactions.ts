import { Router } from 'express';
import { getTransactions, createTransaction, deleteTransaction } from '../controllers/transaction.controller.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.use(authenticateToken);

router.get('/', getTransactions);
router.post('/', createTransaction);
router.delete('/:id', deleteTransaction);

export default router;
