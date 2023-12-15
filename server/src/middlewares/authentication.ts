import { Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { verifyAndDecodeAccessToken } from "../utils/jwt";
import { AuthorizedRequest } from "../types/AuthorizedRequest";
import SocketType from "../types/SocketType";
import { ExtendedError } from "socket.io/dist/namespace";

export const authenticateUser = (req: AuthorizedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log("Authorization header is missing");
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Authorization header is missing" });
  }

  const accessToken = authHeader.split(" ")[1];
  if (!accessToken) {
    console.log("Access token is missing");
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Access token is missing" });
  }

  try {
    const decodedUserData = verifyAndDecodeAccessToken(accessToken);
    req.user = decodedUserData;
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      console.log("Access token has expired");
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Access token has expired",
        accessTokenExpired: true
      });
    }
    console.log("Access token is invalid");
    res.status(StatusCodes.UNAUTHORIZED).json({ message: "Access token is invalid" });
  }
};

export const authenticateSocketConnection = (socket: SocketType, next: (err?: ExtendedError | undefined) => void) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error("Authentication error"));
  }
  try {
    verifyAndDecodeAccessToken(token);
    return next();
  } catch (error) {
    console.log(error);
    return next(new Error("Authentication error"));
  }
};
