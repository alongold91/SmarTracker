import express from 'express';
import {
 signup,
 login,
 readUser,
 readAllUsers,
 updateUser,
 deleteUser
} from '../controllers/usersController';
import { Schemas, ValidateSchema } from '../middleware/validate-schema';

const router = express.Router();
router.post('/signup', ValidateSchema(Schemas.user.create), signup);
router.post('/login', login);
router.get('/:userId', readUser);
router.get('/', readAllUsers);
router.patch('/update/:userId', ValidateSchema(Schemas.user.update), updateUser);
router.delete('/delete/:userId', deleteUser);

export const usersRouter = router;
