import { User } from '@prisma/client';
import { z } from 'zod';

export type RegisterDTO = Pick<User, 'email' | 'username' | 'password'> & {
  firstName: string;
  lastName: string;
};

export type LoginDTO = {
  identity: string;
  password: string;
};

export const UpdateProfileSchema = z.object({
  fullname: z
    .string({ required_error: 'full name is required' })
    .trim()
    .min(5, { message: 'Minimum 5 characters' })
    .max(20, { message: 'Maximum 50 characters' }),
  location: z.string().trim().max(50).nullable(),
  web: z.string().trim().max(100).nullable(),
  birthDate: z.date().optional(),
  bio: z.string().trim().max(100).nullable()
});

export type UpdateProfileDTO = z.infer<typeof UpdateProfileSchema>;
