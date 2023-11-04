import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { signAndGetAccessToken, verifyAndDecodeRefreshToken } from '../../utils/jwt';
import { AuthorizedRequest } from '../../types/AuthorizedRequest';

export const refreshAccessToken = (req: AuthorizedRequest, res: Response) => {
  const refreshToken = req.cookies?.refreshToken;
  console.log("[+] Refresh token: ", refreshToken);

  if ( !refreshToken ) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Refresh token is missing' });
  }

  try {
    const decodedToken = verifyAndDecodeRefreshToken(refreshToken);

    console.log("[+] Decoded token: ", decodedToken);

    const accessToken = signAndGetAccessToken({ id: decodedToken.id, role: decodedToken.role });

    console.log("[+] Access token: ", decodedToken);

    res.status(StatusCodes.OK).json({ accessToken, role: decodedToken.role });

    console.log("[+] Refresh token: is valid")
  } catch (error) {
    console.log("[+] Error: ", error);

    // res.clearCookie("refreshToken", { httpOnly: true });
    // req.user = undefined;
    res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Refresh token is invalid' });
  }
};
