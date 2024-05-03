"use server";
import * as z from "zod";
import { db } from "@/lib/db";
import * as moment from 'moment-timezone';

import { checkSubscribeSchema } from "@/schemas";

import { getEventsByName } from "@/data/event";
import { UserSubscribeForEvent } from "@/data/ticket";

export const SubscribeTickets = async (
  values: z.infer<typeof checkSubscribeSchema>,
) => {
  const validatedFields = checkSubscribeSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const existingEventInfo = await getEventsByName(validatedFields.data.activityName)
  if (existingEventInfo?.id === undefined) {
    return { error: "Invalid fields!" };
  }
  const userId = validatedFields.data.userId
  const ticketType = validatedFields.data.ticketType
  const ticketGroup = validatedFields.data.ticketGroup
  const ticketCount = validatedFields.data.ticketCount
  const existingEventId = existingEventInfo?.id
  const SubResult = await UserSubscribeForEvent(userId,existingEventId)

  if (SubResult) {
    await db.subscribeTicket.create({
      data: {
        userId: userId,
        eventId: existingEventId,
        tickettype: ticketType,
        ticketGroup: ticketGroup,
        ticketCount: ticketCount,
      }
    });
    return { success: "Subscribe success!" };
  } else {
    return { error: "Subscription already exists or failed." };
  }
}