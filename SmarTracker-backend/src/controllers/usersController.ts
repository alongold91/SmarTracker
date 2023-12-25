import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { User } from '@common/src/interfaces/users';
import { UserModel } from '../models/users';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();

const signup = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const userParams: User = req.body;
    const { email, password, currency, interestedInWarnings, warningPercent } =
      userParams;

    const user = new UserModel({
      _id: new mongoose.Types.ObjectId(),
      email,
      password,
      currency,
      interestedInWarnings,
      warningPercent,
      refreshToken: 'dummyDataThatNeedsToBeDeletedInFuture'
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
  console.log('in login')
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
          process.env.ACCESS_TOKEN_SECRET ?? '',
          { expiresIn: '30s' }
        );
        const refreshToken = jwt.sign(
          { _id: user._id },
          process.env.REFRESH_TOKEN_SECRET ?? '',
          { expiresIn: '1d' }
        );

         user.set({
          ...user,
          refreshToken
         })

        res.cookie('jwt', refreshToken, {
          httpOnly: true,
          sameSite: 'none',
          secure: true,
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

export { signup, login, readAllUsers, readUser, updateUser, deleteUser };
