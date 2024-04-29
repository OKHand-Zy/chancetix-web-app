"use server";
import * as z from "zod";
import { db } from "@/lib/db";

import { checkSellTicketSchema } from "@/schemas";
import { getTicketCountForEvent } from "@/data/ticket";
import { getEventsByName } from "@/data/event";

export const checkSellTickets = async (
  values: z.infer<typeof checkSellTicketSchema>,
) => {
  const validatedFields = checkSellTicketSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const existingEventInfo = await getEventsByName(validatedFields.data.activityName)
  if (existingEventInfo?.id === undefined) {
    return { error: "Invalid fields!" };
  }
  const existingEventCategory = existingEventInfo?.capacity
  const existingEventId = existingEventInfo?.id
  const existingTicketType = validatedFields.data.ticketType
  const existingTicketCount = await getTicketCountForEvent(existingEventId,existingTicketType);
  const remainderTicketCount = existingEventCategory-existingTicketCount
    
  if ( remainderTicketCount > 0) {
    return remainderTicketCount
  } else {
    return 0
  }
  
}