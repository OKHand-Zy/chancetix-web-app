import { UserRole } from '@prisma/client';
import { Princess_Sofia } from 'next/font/google';
import * as z from 'zod';

// Account Schema
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
  identity: z.string().length(10,{
    message: "A*********" 
  }),
});

//Event Schema
export const EventSchema = z.object({
  id: z.string(),
  name: z.string(),
  date: z.date(),
  location: z.string(),
  capacity: z.number(),
  image: z.string(),
  tickets: z.number(),
})



// Tickets Schema
export const ticketSchema = z.object({
  userId: z.string(),
});

export const SwitchTixSchema = z.object({
  id: z.number(),
  eventName: z.string(),
  serialNumber: z.string(),
  ticketType: z.string(),
  ticketGroup: z.string(),
  position: z.string(),
  price: z.number(),
});

// snap-up ticket
export const checkSellTicketSchema = z.object({
  activityName: z.string(),
  ticketType: z.string(),
  ticketGroup: z.string(),
})

// lottery ticket
export const LTixSchema = z.object({
  activityName: z.string(),
  actype: z.string(),
  volunteerF: z.string(),
  vFCounts: z.number(),
  volunteerS: z.string(),
  vSCounts: z.number(),
});
export const LTixUserSchema = z.array(
  z.object({
    volunteerType: z.string(),
    customerName: z.string().min(1, {message: "Name is required."}),
    customerCellphone: z.string().min(9, {message: "09xxxxxxxx or 9xxxxxxxx"}).max(10, {message: "09xxxxxxxx or 9xxxxxxxx"}),
    customerIdentity: z.string().length(10, {message: "A*********"}),
  })
);
// old_function
export const checkSubscribeSchema = z.object({
  userId: z.string(),
  activityName: z.string(),
  ticketType: z.string(),
  ticketGroup: z.string(),
  ticketCount: z.number(),
})



// only for task page
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
});


