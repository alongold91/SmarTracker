import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

dotenv.config();

const verifyAccessToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.sendStatus(401);
  }
  const token = authHeader.split(' ')[1];

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    (err, decoded) => {
      if (err) {
        return res.sendStatus(403);
      }
      if (decoded) req.body._id = (decoded as JwtPayload)._id;

      next();
    }
  );
};

const verifyResetToken = (req: Request, res: Response, next: NextFunction) => {
  const { resetToken } = req.body;

  jwt.verify(
    resetToken,
    process.env.RESET_TOKEN_SECRET as string,
    (err: any, decoded: any) => {
      if (err) {
        return res.sendStatus(403);
      }
      if (decoded) req.body.email = (decoded as JwtPayload).email;
      next();
    }
  );
};

export {verifyAccessToken, verifyResetToken}