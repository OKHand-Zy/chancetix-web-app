"use server";
import * as z from "zod";
import { db } from "@/lib/db";

import { findTicketGoupSchema } from "@/schemas";
import { getEventGroups } from "@/data/event";
import { time } from "console";

export const findTicketGroups = async (
  values: z.infer<typeof findTicketGoupSchema>,
) => {
  const validatedFields = findTicketGoupSchema.safeParse(values);

  if (!validatedFields.success) {
    return null;
  }

  const eventName = validatedFields.data.eventName;
  const ticketTypes = validatedFields.data.ticketType;
  const ticketGroupData = await getEventGroups(eventName, ticketTypes);
  return ticketGroupData

}