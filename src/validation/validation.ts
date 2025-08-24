import * as z from 'zod';
import { useStore } from '../store/store';

export const formValidation = () => {
  const countries = useStore.getState().countries;
  return z
    .object({
      name: z
        .string()
        .min(1, 'Name is required')
        .regex(/^[A-Z][a-zA-Z]*$/, 'Name should start with uppercase letter'),
      age: z.number().min(1, 'Age must be positive').max(110, 'Too big age'),
      gender: z.enum(['male', 'female']),
      email: z.email('Invalid email, must be example@mail.com'),
      password: z
        .string()
        .min(6, 'Password too short')
        .regex(/[0-9]/, 'Password must contain a number')
        .regex(/[A-Z]/, 'Password must contain an uppercase letter')
        .regex(/[a-z]/, 'Password must contain a lowercase letter')
        .regex(/[^a-zA-Z0-9]/, 'Password must contain a special character'),
      confirmedPassword: z.string(),
      agreement: z.boolean().refine((v) => v === true, {
        message: 'You must accept T&C',
      }),
      country: z
        .string()
        .min(1, 'Country is required')
        .refine((val) => countries.includes(val), {
          message: 'Please select a valid country',
        }),
      file: z
        .string()
        .nullable()
        .refine((val) => val !== null && val !== '', 'File is required'),
    })
    .refine((data) => data.password === data.confirmedPassword, {
      message: 'Passwords must match',
      path: ['confirmedPassword'],
    });
};
