import { db } from "@/lib/db";

export const getEventsInfo = async (eventId: string) => {
  const eventInfo = await db.event.findFirst({
    where: {
      id: eventId
    }
  })
  return eventInfo
}