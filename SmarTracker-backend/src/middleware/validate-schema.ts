import { NextFunction, Request, Response } from 'express';
import Joi, { ObjectSchema } from 'joi';
import Logging from '../library/Logging';
import { Expense } from '@common/src/interfaces/expenses';
import { User } from '@common/src/interfaces/users';

export const ValidateSchema = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      Logging.error(error);
      return res.status(422).json(error);
    }
  };
};

export const Schemas = {
  user: {
    create: Joi.object<User>({
      email: Joi.string().required().email({ minDomainSegments: 2 }).messages({
        'any.required': 'Email field is required',
        'string.email': 'Email address must be a valid email'
      }),

      password: Joi.string().required().messages({
        'any.required': 'Password field is required',
        'string.empty': 'Password field cannot be empty'
      }),

      currency: Joi.string().required().messages({
        'string.empty': 'Currency must be specified'
      }),

      interestedInWarnings: Joi.boolean().required().messages({
        'any.required': 'Choosing if you are interested in warnings is required'
      }),

      warningPercent: Joi.number()
        .when('interestedInWarnings', {
          is: true,
          then: Joi.required().messages({
            'any.required':
              'You chose to receive a notification once your monthly expenses reach a certain percent of your monthly budget, you need to specify this percent'
          })
        })
        .when('interestedInWarnings', {
          is: false,
          then: Joi.forbidden().messages({
            'any.unknown':
              'We do not need you to specify a notification percent since you are not interested in receiving email notifications'
          })
        })
    }),
    update: Joi.object<User>({
      email: Joi.string().required().email({ minDomainSegments: 2 }).messages({
        'any.required': 'Email field is required',
        'string.email': 'Email address must be a valid email'
      }),

      password: Joi.string().required().messages({
        'any.required': 'Password field is required',
        'string.empty': 'Password field cannot be empty'
      }),

      currency: Joi.string().required().messages({
        'string.empty': 'Currency must be specified'
      }),

      interestedInWarnings: Joi.boolean().required().messages({
        'any.required': 'Choosing if you are interested in warnings is required'
      }),

      warningPercent: Joi.number()
        .when('interestedInWarnings', {
          is: true,
          then: Joi.required().messages({
            'any.required':
              'You chose to receive a notification once your monthly expenses reach a certain percent of your monthly budget, you need to specify this percent'
          })
        })
        .when('interestedInWarnings', {
          is: false,
          then: Joi.forbidden().messages({
            'any.unknown':
              'We do not need you to specify a notification percent since you are not interested in receiving email notifications'
          })
        })
    })
  },
  expense: {
    create: Joi.object<Expense>({
      userId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      title: Joi.string(),
      date: Joi.number().required(),
      sum: Joi.number().required().messages({
        'any.required': 'Sum field is required',
        'number.base': 'Sum needs to be a number'
      }),
      category: Joi.string().required().messages({
        'any.required': 'Category field is required'
      }),
      description: Joi.string(),
      receiptImagePath: Joi.string()
    }),
    update: Joi.object<Expense>({
      userId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      title: Joi.string(),
      date: Joi.number().required(),
      sum: Joi.number().required().messages({
        'any.required': 'Sum field is required',
        'number.base': 'Sum needs to be a number'
      }),
      category: Joi.string().required().messages({
        'any.required': 'Category field is required'
      }),
      description: Joi.string(),
      receiptImagePath: Joi.string()
    })
  }
};
