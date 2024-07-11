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

export const getEventGroups = async (
  eventName: string,
  ticketType: string
) => {
  const eventData = await db.event.findFirst({
    where: {
      name: eventName
    }
  })
  const eventId = eventData?.id
  const eventGroupData = await db.ticketGroups.findMany({
    where: {
      eventId: eventId,
      TicketType:{
        typeName: ticketType
      }
    },
    include: {
      TicketType: true
    }
  })
  const eventGroups = eventGroupData.map((group) => group.groupName);
  return eventGroups
}

export const getEventByUserId = async (userId: string) => {
  const eventList = await db.event.findMany({
    where: {
      host: {
        id: userId
      }
    }
  })
  return eventList
}