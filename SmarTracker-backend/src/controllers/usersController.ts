import { User } from '@common/src/interfaces/users';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { UserModel } from '../models/users';

dotenv.config();

const signup = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const userParams: User = req.body;
    const { email, password, currency, interestedInWarnings, warningPercent } =
      userParams;

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

    const user = new UserModel({
      _id: new mongoose.Types.ObjectId(),
      email,
      password: hashedPassword,
      currency,
      interestedInWarnings,
      warningPercent,
      refreshToken: ''
    });

    const savedUser = await user.save();

    return res.status(201).json({ user: savedUser });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const login = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'email and password are required.' });
    }

    const user = await UserModel.findOne({ email });

    if (user) {
      const match: boolean = await bcrypt.compare(password, user.password);
      // If passwords have matched
      if (match) {
        const accessToken = jwt.sign(
          { _id: user._id },
          process.env.ACCESS_TOKEN_SECRET as string,
          { expiresIn: '5m' }
        );
        const refreshToken = jwt.sign(
          { _id: user._id },
          process.env.REFRESH_TOKEN_SECRET as string,
          { expiresIn: '1d' }
        );

        user.refreshToken = refreshToken;

        await user.save();

        res.cookie('jwt', refreshToken, {
          httpOnly: true,
          sameSite: 'none',
          secure: false,
          maxAge: 24 * 60 * 60 * 1000 // max age is 24 hours
        });

        return res.status(200).json({ accessToken });
      }
      return res.status(500).json({ message: 'Incorrect password' });
    }
    return res.status(500).json({ message: 'Incorrect email' });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const refreshToken = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>> | undefined> => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const foundUser = await UserModel.findOne({ refreshToken });

  if (!foundUser) return res.sendStatus(403); //Forbidden


  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, (err: any, decoded: any) => {
    if (err || foundUser._id !== decoded._id) {
      return res.sendStatus(403);
    }
    const newAccessToken = jwt.sign(
      { username: decoded.username },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: '5m' }
    );
    return res.json({ newAccessToken });
  });
};


const readUser = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const userId = req.params.userId;

    const user = await UserModel.findById(userId).select('-__v');

    if (user) {
      return res.status(200).json({ user });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};
const readAllUsers = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const users = await UserModel.find().select('-__v');
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const updateUser = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const userId = req.params.userId;
    const user = await UserModel.findById(userId);

    if (user) {
      user.set(req.body);
      try {
        await user.save();
        return res.status(201).json(user);
      } catch (error) {
        return res.status(500).json({ error });
      }
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const userId = req.params.userId;

  try {
    const user = await UserModel.findByIdAndDelete(userId);
    if (user) {
      return res.status(201).json({ user, message: 'User deleted' });
    }
    return res.status(404).json({ message: 'User not found' });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export { deleteUser, login, refreshToken, readAllUsers, readUser, signup, updateUser };

