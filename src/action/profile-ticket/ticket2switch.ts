"use server";
import * as z from "zod";
import { db } from "@/lib/db";

import { changeTicket } from "@/schemas";
import { getEventsById } from "@/data/event"

export const change2SwitchTicket = async (
  values: z.infer<typeof changeTicket>,
) => {
  const validatedFields = changeTicket.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const existingTicket = await db.ticket.findMany({
    where: {
      userId: validatedFields.data.userId,
      serialNumber: validatedFields.data.ticketSN,
    },
  })
  if (existingTicket.length !== 1) {
    return { error: "Invalid fields! Please connect to our support!" };
  }
  const eventData = await getEventsById(existingTicket[0].eventId);
  
  if (!eventData) {
    return { error: "Invalid fields! Please connect to our support!" };
  }

  await db.switchTicket.create({
    data: {
      eventName: eventData.name,
      serialNumber: existingTicket[0].serialNumber,
      ticketType: existingTicket[0].ticketType,
      ticketGroup: existingTicket[0].ticketGroup,
      position: existingTicket[0].position,
      price: existingTicket[0].price,
    },
  });

  await db.ticket.deleteMany({
    where: {
      userId: validatedFields.data.userId,
      serialNumber: validatedFields.data.ticketSN,
    },
  });
  
  console.log("Success!")
  return { success: "Success!" };
}