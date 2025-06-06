import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import pool from '../config/db';

interface JwtPayload {
  id: number;
  role: string;
}

export const protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let token;

  try {
    // Check Authorization header first
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    } else {
      // Fallback to jwt cookie
      token = req.cookies.jwt;
    }

    if (!token) {
      res.status(401).json({ message: 'Not authorized, no token' });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    const userQuery = await pool.query(
      'SELECT id, name, email, role FROM users WHERE id = $1',
      [decoded.id]
    );

    if (userQuery.rows.length === 0) {
      res.status(401).json({ message: 'User not found' });
      return;
    }

    // @ts-ignore
    req.user = userQuery.rows[0];
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

export const admin = (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' });
  }
};

export const protectOptional = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let token;

  try {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    } else {
      token = req.cookies.jwt;
    }

    if (!token) {
      return next(); // Guest — no user attached
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    const userQuery = await pool.query(
      'SELECT id, name, email, role FROM users WHERE id = $1',
      [decoded.id]
    );

    if (userQuery.rows.length > 0) {
      // @ts-ignore
      req.user = userQuery.rows[0]; // Authenticated user
    }

    return next();
  } catch (error) {
    console.warn('Optional auth failed or no valid token. Proceeding as guest.');
    return next(); // Proceed as guest
  }
};