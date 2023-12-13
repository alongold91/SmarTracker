import mongoose, { Document, Schema } from 'mongoose';

export interface Expense {
  userId: string;
  title?: string;
  date: number;
  sum: number;
  category: string;
  description?: string;
  receiptImagePath?: string;
}

export interface ExpenseDocument extends Expense, Document {}

const ExpenseSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
    immutable: true
  },
  title: { type: String, required: false },
  date: { type: Number, required: true },
  sum: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String, required: false },
  receiptImagePath: { type: String, required: false }
});

ExpenseSchema.index({ category: 1 }, { unique: false });

export const ExpenseModel = mongoose.model<ExpenseDocument>(
  'Expenses',
  ExpenseSchema
);
