import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { User, UserModel } from '../models/users';

const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<any, Record<string, any>>> => {
  try {
    const userParams: User = req.body;
    const { userName, password, interestedInWarnings, email } = userParams;

    const user = new UserModel({
      _id: new mongoose.Types.ObjectId(),
      userName,
      password,
      interestedInWarnings,
      email
    });

    const savedUser = await user.save();

    return res.status(201).json({ user: savedUser });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// const readAuthor = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<Response<any, Record<string, any>>> => {
//   try {
//     const authorId = req.params.authorId;

//     const author = await Author.findById(authorId);

//     if (author) {
//       return res.status(200).json({ author });
//     } else {
//       return res.status(404).json({ message: 'not found' });
//     }
//   } catch (error) {
//     return res.status(500).json({ error });
//   }
// };
// const readAll = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<Response<any, Record<string, any>>> => {
//   try {
//     const authors = await Author.find();
//     return res.status(200).json({ authors });
//   } catch (error) {
//     return res.status(500).json({ error });
//   }
// };

// const updateAuthor = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<Response<any, Record<string, any>>> => {
//   try {
//     const authorId = req.params.authorId;
//     const author = await Author.findById(authorId);

//     if (author) {
//       author.set(req.body);
//       try {
//         await author.save();
//         return res.status(201).json(author);
//       } catch (error) {
//         return res.status(500).json({ error });
//       }
//     } else {
//       return res.status(404).json({ message: 'Not found' });
//     }
//   } catch (error) {
//     return res.status(500).json({ error });
//   }
// };

// const deleteAuthor = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<Response<any, Record<string, any>>> => {
//   const authorId = req.params.authorId;

//   try {
//     const author = await Author.findByIdAndDelete(authorId);
//     if (author) {
//       return res.status(201).json({ author, message: 'Deleted' });
//     }
//     return res.status(404).json({ message: 'Not found' });
//   } catch (error) {
//     return res.status(500).json({ error });
//   }
// };

// export { createAuthor, readAuthor, readAll, updateAuthor, deleteAuthor };
export { createUser };