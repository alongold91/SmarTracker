// import Joi, { ObjectSchema } from 'joi';
// import { Response, Request, NextFunction } from 'express';
// import Logging from '../library/Logging';
// import { IAuthor } from '../models/author';
// import { IBook } from '../models/book';

// export const ValidateSchema = (schema: ObjectSchema) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       await schema.validateAsync(req.body);
//       next();
//     } catch (error) {
//       Logging.error(error);
//       return res.status(422).json(error);
//     }
//   };
// };

 // TODO: use this logic -> validate: {
    //   validator: function(this: UserDocument, v: string) {
    //     return Boolean(v) && Boolean(this.interestedInWarnings);
    //   },
    //   message:
    //     'percentage to warn about is not supposed to be received when you are not interested in notification emails'
    // }

// export const Schemas = {
//   author: {
//     create: Joi.object<IAuthor>({
//       name: Joi.string().required()
//     }),
//     update: Joi.object<IAuthor>({
//       name: Joi.string().required()
//     })
//   },
//   book: {
//     create: Joi.object<IBook>({
//       author: Joi.string()
//         .regex(/^[0-9a-fA-F]{24}$/)
//         .required(),
//       title: Joi.string().required()
//     }),
//     update: Joi.object<IBook>({
//         author: Joi.string()
//           .regex(/^[0-9a-fA-F]{24}$/)
//           .required(),
//         title: Joi.string().required()
//       })
//   }
// };
