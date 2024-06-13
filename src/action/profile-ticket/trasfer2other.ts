"use server";
import * as z from "zod";
import { db } from "@/lib/db";

import { TarnsferTixSchema } from "@/schemas";


export const transferTicket = async (
  values: z.infer<typeof TarnsferTixSchema>,
) => {
  const validatedFields = TarnsferTixSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const CheckTicket = await db.ticket.findUnique({
    where: {
      serialNumber: validatedFields.data.ticketSN,
      user: {
        name: validatedFields.data.holderName,
        email: validatedFields.data.holderEmail
      } ,
    },
  })
  if (!CheckTicket) {
    return { error: "Invalid fields!" };
  }

  const TransferUserData = await db.user.findFirst({
    where: {
      email: validatedFields.data.transferEmail,
    },
  })
  if (!TransferUserData) {
    return { error: "Invalid fields!" };
  }
  
  await db.ticket.update({
    where: {
      serialNumber: validatedFields.data.ticketSN,
    },
    data: {
      user: {
        connect: {
          id: TransferUserData.id,
        },
      },
    },
  }) 

  return { success: "Transfer ticket success!" };

  
  
}