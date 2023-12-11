import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Author from '../models/author';

const createAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<any, Record<string, any>>> => {
  try {
    const { name } = req.body;

    const author = new Author({
      _id: new mongoose.Types.ObjectId(),
      name
    });

    const savedAuthor = await author.save();

    return res.status(201).json({ author: savedAuthor });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const readAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<any, Record<string, any>>> => {
  try {
    const authorId = req.params.authorId;

    const author = await Author.findById(authorId);

    if (author) {
      return res.status(200).json({ author });
    } else {
      return res.status(404).json({ message: 'not found' });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};
const readAll = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<any, Record<string, any>>> => {
  try {
    const authors = await Author.find();
    return res.status(200).json({ authors });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const updateAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<any, Record<string, any>>> => {
  try {
    const authorId = req.params.authorId;
    const author = await Author.findById(authorId);

    if (author) {
      author.set(req.body);
      try {
        await author.save();
        return res.status(201).json(author);
      } catch (error) {
        return res.status(500).json({ error });
      }
    } else {
      return res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const deleteAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<any, Record<string, any>>> => {
  const authorId = req.params.authorId;

  try {
    const author = await Author.findByIdAndDelete(authorId);
    if (author) {
      return res.status(201).json({ author, message: 'Deleted' });
    }
    return res.status(404).json({ message: 'Not found' });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export { createAuthor, readAuthor, readAll, updateAuthor, deleteAuthor };
