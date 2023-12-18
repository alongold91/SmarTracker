import express from 'express';
import {
  createExpense,
  deleteExpense,
  getExpensesByUserId,
  readAllExpenses,
  readExpense,
  updateExpense
} from '../controllers/expenses';
import { Schemas, ValidateSchema } from '../middleware/validate-schema';

const router = express.Router();

router.post('/create', ValidateSchema(Schemas.expense.create), createExpense);
router.get('/:expenseId', readExpense);
router.get('/', readAllExpenses);
router.patch('/update/:expenseId', ValidateSchema(Schemas.expense.update), updateExpense);
router.delete('/delete/:expenseId', deleteExpense);
router.get('/user/:userId', getExpensesByUserId);

export const expensesRouter = router;
