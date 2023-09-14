import {
  emailRegExp,
  firstNameRegExp,
  lastNameRegExp,
  passwordRegExp,
  usernameRegExp
} from '@/constants/regexp';
import prisma from '@/prisma';
import { initRepositories } from '@/repositories/initRepository';
import { RegisterDTO } from '@/types/user.types';
import { NextFunction, Request, Response } from 'express';

type ErrorField = {
  field: string;
  message: string;
};

export const validateRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { email, firstName, password, username, lastName } =
    req.body as RegisterDTO;
  let errors: ErrorField[] = [];
  if (!email.match(emailRegExp)) {
    errors = [...errors, { field: 'email', message: 'invalid email' }];
  }
  if (!firstName.match(firstNameRegExp)) {
    errors = [
      ...errors,
      {
        field: 'firstName',
        message:
          "First name only contains letters and appropriate symbols dash(-) or single quote('). Space is not allowed"
      }
    ];
  }
  if (lastName && !lastName.match(lastNameRegExp)) {
    errors = [
      ...errors,
      {
        field: 'lastName',
        message:
          "Last name can contains letters, appropriate symbols dash(-) or single quote('), and space"
      }
    ];
  }
  if (!password.match(passwordRegExp)) {
    errors = [
      ...errors,
      {
        field: 'password',
        message:
          'Password requires minimum 6 characters. Including at least an uppercase, a lowercase, a number and a symbol'
      }
    ];
  }
  if (!username.match(usernameRegExp)) {
    errors = [
      ...errors,
      {
        field: 'username',
        message:
          'Username requires minimum 6 characters. Including lowercase, number and optional characters dot(.) or underscore(_)'
      }
    ];
  }
  if (errors.length === 0) {
    const { userRepository } = initRepositories(prisma, ['user']);
    try {
      const isEmailExists = await userRepository.findOne({ email });
      if (isEmailExists) {
        return res.status(400).json({ message: 'Email has been registered' });
      }
      const isUsernameExists = await userRepository.findOne({ username });
      if (isUsernameExists) {
        return res.status(400).json({ message: 'Username already taken' });
      }
    } catch (err) {
      next(err);
    }
    next();
  } else {
    return res.status(400).json({ errors });
  }
};
