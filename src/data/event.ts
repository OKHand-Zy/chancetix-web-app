import { db } from "@/lib/db";
import { eventNames } from "process";

export const getEventsById = async (eventId: string) => {
  const eventInfo = await db.event.findFirst({
    where: {
      id: eventId
    }
  })
  return eventInfo
}

export const getEventsByName = async (eventNames: string) => {
  const eventInfo = await db.event.findFirst({
    where: {
      name: eventNames
    }
  })
  return eventInfo
}