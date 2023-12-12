import mongoose, { Document, Schema } from 'mongoose';

export interface Expense {
  userId: string;
  title?: string;
  date: number;
  amount: number;
  category: string;
  description?: string;
}

export interface ExpenseDocument extends Expense, Document {}

const ExpenseSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User', immutable: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  title: { type: String, required: false },
  description: { type: String, required: false },
  date: { type: Number, required: true }
});

export const ExpenseModel = mongoose.model<ExpenseDocument>(
  'Expenses',
  ExpenseSchema
);
