import jwt from 'jsonwebtoken';
import { AppError } from '../utils/errorHandler';

export const protect = async (req: any, res: any, next: any) => {
  try {
    let token;
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new AppError('Not authorized, no token', 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    next(new AppError('Not authorized', 401));
  }
};