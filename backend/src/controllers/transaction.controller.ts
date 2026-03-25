import { Response, NextFunction } from 'express';
import prisma from '../config/prisma.js';
import { AuthRequest } from '../middleware/auth.js';

export const getTransactions = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId;
    const transactions = await prisma.transaction.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });

    res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
};

export const createTransaction = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId!;
    const { type, amount, category, date } = req.body;

    const transaction = await prisma.transaction.create({
      data: {
        userId,
        type,
        amount,
        category,
        date: date ? new Date(date) : new Date(),
      },
    });

    res.status(201).json(transaction);
  } catch (error) {
    next(error);
  }
};

export const deleteTransaction = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId;
    const { id } = req.params;

    const transaction = await prisma.transaction.findUnique({
      where: { id },
    });

    if (!transaction || transaction.userId !== userId) {
      return res.status(404).json({ error: 'Transaction not found or unauthorized' });
    }

    await prisma.transaction.delete({
      where: { id },
    });

    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    next(error);
  }
};
