import express from 'express';
import {
  createExpense,
  readExpense,
  readAllExpenses,
  deleteExpense,
  updateExpense
} from '../controllers/expenses';
// import { Schemas, ValidateSchema } from '../middleware/validate-schema';
// import { Schemas, ValidateJoi } from '../middleware/Joi';

const router = express.Router();

router.post('/create', createExpense);
router.get('/:expenseId', readExpense);
router.get('/', readAllExpenses);
// router.patch('/update/:bookId', ValidateSchema(Schemas.book.update), controller.updateBook);
router.patch('/update/:expenseId', updateExpense);
router.delete('/delete/:expenseId', deleteExpense);

export const expensesRouter = router;
