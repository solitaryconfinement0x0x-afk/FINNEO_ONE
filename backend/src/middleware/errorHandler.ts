import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('[Error Handler]:', err.message || err);
  
  const status = err.status || 500;
  const message = err.message || 'An unexpected error occurred';

  res.status(status).json({
    error: message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
};
