import { Response, NextFunction } from 'express';
import prisma from '../config/prisma.js';
import { AuthRequest } from '../middleware/auth.js';

export const getProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId;
    const profile = await prisma.financialProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};

export const createProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId!;
    const { income, expenses, savings, riskLevel } = req.body;

    const profile = await prisma.financialProfile.create({
      data: {
        userId,
        income,
        expenses,
        savings,
        riskLevel,
      },
    });

    res.status(201).json(profile);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId;
    const { income, expenses, savings, riskLevel } = req.body;

    const profile = await prisma.financialProfile.update({
      where: { userId },
      data: {
        income,
        expenses,
        savings,
        riskLevel,
      },
    });

    res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};
