import { Request, Response, NextFunction } from 'express';

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    isAdmin?: boolean;
  };
}

export const adminOnly = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: 'Admin access required' });
  }
};
