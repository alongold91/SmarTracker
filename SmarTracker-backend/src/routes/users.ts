import express from 'express';
import {
 signup,
 login,
 refreshToken,
 readUser,
 readAllUsers,
 updateUser,
 deleteUser,
 forgotPassword
} from '../controllers/usersController';
import { Schemas, ValidateSchema } from '../middleware/validate-schema';


const router = express.Router();
router.post('/signup', ValidateSchema(Schemas.user.create), signup);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.get('/refreshtoken', refreshToken)
router.get('/:userId', readUser); 
router.get('/', readAllUsers);
router.patch('/update/:userId', ValidateSchema(Schemas.user.update), updateUser);
router.delete('/delete/:userId', deleteUser);

export const usersRouter = router;
