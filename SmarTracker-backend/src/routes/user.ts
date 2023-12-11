import express from 'express';
import {
 createUser
  // deleteAuthor,
  // readAll,
  // readAuthor,
  // updateAuthor
} from '../controllers/user';
// import { Schemas, ValidateSchema } from '../middleware/validate-schema';

const router = express.Router();
router.post('/create', createUser);
// router.post('/create', ValidateSchema(Schemas.author.create), createAuthor);
// router.get('/get/:authorId', readAuthor);
// router.get('/get', readAll);
// router.patch('/update/:authorId', ValidateSchema(Schemas.author.update), updateAuthor);
// router.delete('/delete/:authorId', deleteAuthor);

export = router;
