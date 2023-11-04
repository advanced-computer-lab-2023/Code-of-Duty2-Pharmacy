import { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verifyAndDecodeAccessToken } from '../utils/jwt';
import { AuthorizedRequest } from '../types/AuthorizedRequest';

export const authenticateUser = (req: AuthorizedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log('Authorization header is missing' )
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Authorization header is missing' });
  }

  const accessToken = authHeader.split(' ')[1];
  if (!accessToken) {
    console.log('Access token is missing' )
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Access token is missing' });
  }

  try {
    const decodedUserData = verifyAndDecodeAccessToken(accessToken);
    req.user = decodedUserData;
    console.log('Authenticated')
    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      console.log('Access token has expired')
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Access token has expired', accessTokenExpired: true });
    }
    console.log('Access token is invalid')
    res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Access token is invalid' });
  }
};
