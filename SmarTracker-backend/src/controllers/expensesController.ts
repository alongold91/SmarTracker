import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { ExpenseModel } from '../models/expenses';
import { Expense } from '@common/src/interfaces/expenses';

const createExpense = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const userReqBodyParams: Expense = req.body;
    const {
      userId,
      title,
      date,
      sum,
      paymentMethod,
      category,
      description,
      receiptImagePath
    } = userReqBodyParams;

    const expense = new ExpenseModel({
      _id: new mongoose.Types.ObjectId(),
      userId,
      title,
      date,
      sum,
      paymentMethod,
      category,
      description,
      receiptImagePath
    });

    const savedExpense = await expense.save();

    return res.status(201).json({ expense: savedExpense });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

const readExpense = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const expenseId = req.params.expenseId;

    const expense = await ExpenseModel.findById(expenseId).select('-__v');

    if (expense) {
      return res.status(200).json({ expense });
    } else {
      return res.status(404).json({ message: 'Expense not found' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};
const readAllExpenses = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const expenses = await ExpenseModel.find().select('-__v');
    return res.status(200).json({ expenses });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const updateExpense = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const expenseId = req.params.expenseId;
    const expense = await ExpenseModel.findById(expenseId);

    if (expense) {
      expense.set(req.body);
      try {
        await expense.save();
        return res.status(201).json(expense);
      } catch (error) {
        return res.status(500).json({ error });
      }
    } else {
      return res.status(404).json({ message: 'Expense not found' });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const deleteExpense = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const expenseId = req.params.expenseId;

  try {
    const expense = await ExpenseModel.findByIdAndDelete(expenseId);
    if (expense) {
      return res
        .status(201)
        .json({ user: expense, message: 'Expense deleted' });
    }
    return res.status(404).json({ message: 'Expense not found' });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const getExpensesByUserId = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const userId = req.params.userId;
  try {
    const expenses: Expense[] = await ExpenseModel.find({ userId });
    return res.status(201).json(expenses);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export {
  createExpense,
  readExpense,
  readAllExpenses,
  updateExpense,
  deleteExpense,
  getExpensesByUserId
};
