"use server";
import * as z from "zod";
import { db } from "@/lib/db";
import { userIdSchema } from "@/schemas";
import { getTansferTicketByUserId } from "@/data/ticket";

export const findTransferTicket = async (
  values: z.infer<typeof userIdSchema>,
) => {
  const validatedFields = userIdSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { userId } = validatedFields.data;
  const existingTransferTicket = await getTansferTicketByUserId(userId);
  
  return existingTransferTicket
}