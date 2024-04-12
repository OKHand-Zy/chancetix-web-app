"use server";
import * as z from "zod";
import { db } from "@/lib/db";
import { ticketSchema } from "@/schemas";
import { getTicketByUserId } from "@/data/ticket";

export const findTicket = async (
  values: z.infer<typeof ticketSchema>,
) => {
  const validatedFields = ticketSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { userId } = validatedFields.data;
  const existingUserTicket = await getTicketByUserId(userId);
  
  return existingUserTicket
}