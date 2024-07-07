"use server";
import * as z from "zod";
import { db } from "@/lib/db";

import { checkSellTicketSchema } from "@/schemas";
import { getTicketCountForEvent, getPendingTicketCountForEvent, getGroupTicketCountForEvent } from "@/data/ticket";
import { getEventsByName } from "@/data/event";
import { time } from "console";

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
  const EventCategory = existingEventInfo?.capacity
  const EventId = existingEventInfo?.id
  const TicketType = validatedFields.data.ticketType
  const TicketGroup = validatedFields.data.ticketGroup
  
  const TicketCount = await getTicketCountForEvent(EventId,TicketType,TicketGroup);
  const GroupTicketCount = await getGroupTicketCountForEvent(EventId,TicketType,TicketGroup);
  const PendingTicketCount = await getPendingTicketCountForEvent(EventId,TicketType,TicketGroup)
  const remainderTicketCount = GroupTicketCount-TicketCount-PendingTicketCount 
  
  if ( remainderTicketCount > 0) {
    return { status: "sell",ticketCount: remainderTicketCount }
  } else if (remainderTicketCount === 0 && PendingTicketCount > 0) {
    return { status: "Pending",TicketCount: remainderTicketCount}
  } else if (remainderTicketCount === 0 && PendingTicketCount === 0) {
    return { status: "sellOut",TicketCount: remainderTicketCount}
  } else {
    return { error: "Invalid fields!" };
  }
  
}