import express from 'express';
import {
 createUser,
 readUser,
 readAllUsers,
 updateUser,
 deleteUser
} from '../controllers/users';
import { Schemas, ValidateSchema } from '../middleware/validate-schema';

const router = express.Router();
router.post('/create', ValidateSchema(Schemas.user.create), createUser);
router.get('/:userId', readUser);
router.get('/', readAllUsers);
router.patch('/update/:userId', ValidateSchema(Schemas.user.update), updateUser);
router.delete('/delete/:userId', deleteUser);

export const usersRouter = router;
