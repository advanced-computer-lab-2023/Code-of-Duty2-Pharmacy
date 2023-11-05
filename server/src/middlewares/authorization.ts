import { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserRole from '../types/UserRole';
import { AuthorizedRequest } from '../types/AuthorizedRequest';

// TODO: Implement another authorization middleware for multiple roles
// and begin applying authorization to the routes.

export const authorizeUser = (role: UserRole) => {
  return (req: AuthorizedRequest, res: Response, next: NextFunction) => {
    if (req.user?.role == undefined || role !== req.user.role) {
      return res.status(StatusCodes.FORBIDDEN).json({ message: 'You are not authorized to access this resource' });
    }
    console.log('Authorized')
    next();
  };
}