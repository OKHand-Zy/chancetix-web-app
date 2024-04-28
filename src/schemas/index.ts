import { UserRole } from '@prisma/client';
import * as z from 'zod';

export const SettingsSchema = z.object({
  name: z.optional(z.string()),
  isTwoFactorEnabled: z.optional(z.boolean()),
  role: z.enum([UserRole.ADMIN, UserRole.USER]),
  email: z.optional(z.string().email()),
  password: z.optional(z.string().min(6)),
  newPassword: z.optional(z.string().min(6)),
})
  .refine((data) => {
    if (data.password && !data.newPassword) {
      return false;
    }

    return true;
  }, {
    message: "New password is required!",
    path: ["newPassword"],
  })
  .refine((data) => {
    if (data.newPassword && !data.password) {
      return false;
    }

    return true;
  }, {
    message: "Password is required!",
    path: ["password"],
  })

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
  cellphone: z.string().min(9, {
    message: "09xxxxxxxx or 9xxxxxxxx"
  }).max(10),
  userId: z.string().length(10,{
    message: "A*********" 
  }),
});

export const ticketSchema = z.object({
  userId: z.string(),
});

export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
});

export const SwitchTixSchema = z.object({
  userId: z.string(),
  eventId: z.string(),
  tickettype: z.string(),
  ticketNumber: z.string(),
  serialNumber: z.number(),
  ticketGroup: z.string(),
  position: z.string(),
  price: z.number(),
});
