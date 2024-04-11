import * as z from 'zod';

export const SettingsSchema = z.object({
  name: z.optional(z.string()),
  
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum 6 characters required."
  })
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required."
  })
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required."
  }),
  password: z.string().min(6, {
    message: "Password is required."
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  name: z.string().min(3, {
    message: "Name is required."
  }),
  email: z.string().email({
    message: "Email is required."
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required."
  }),
});

export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
});