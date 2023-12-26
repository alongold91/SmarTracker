import dotenv from 'dotenv';
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';

dotenv.config();

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.sendStatus(401);
  }
  const token = authHeader.split(' ')[1];


  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET ?? '', (err, decoded) => {

    if (err) {
      return res.sendStatus(403);
    }
    if (decoded)
    req.body._id = (decoded as JwtPayload)._id;

    next();
  });
};
