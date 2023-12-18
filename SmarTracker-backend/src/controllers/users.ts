import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { User } from '@common/src/interfaces/users';
import { UserModel } from '../models/users';

const createUser = async (
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
      warningPercent
    });

    const savedUser = await user.save();

    return res.status(201).json({ user: savedUser });
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

export { createUser, readAllUsers, readUser, updateUser, deleteUser };
