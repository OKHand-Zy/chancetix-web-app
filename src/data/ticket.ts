import {db} from "@/lib/db";
import { eventNames } from "process";



export const getTicketByUserId = async (userId: string) => {
  const ticket = await db.ticket.findMany({
    where: {
        userId,
    },
  });
  return ticket;
}

export const getTicketByeventId = async (eventId: string) => {
  const ticket = await db.ticket.findMany({
    where: {
        eventId,
    },
  });
  return ticket;
}

export const getTansferTicketByUserId = async (userId: string) => {
  const ticket = await db.ticket.findMany({
    where: {
      userId,
      transfer: true,
    },
  });
  return ticket;
}

// snap up ticket function
export const getTicketCountForEvent = async(
  eventId: string,
  ticketType: string,
  ticketGroup: string
) => {
  // 查詢特定事件並包含其所有票數
  if (ticketGroup === "" ) {
    const eventData = await db.event.findUnique({
      where: {
        id: eventId,
      },
      include: {
        tickets: {
          where: {
            tickettype: ticketType, 
          },
        }
      },
    });
    return eventData?.tickets.length || 0;
  } else {
    const eventData = await db.event.findUnique({
      where: {
        id: eventId,
      },
      include: {
        tickets: {
          where: {
            tickettype: ticketType, 
            ticketGroup: ticketGroup
          },
        }
      },
    });
    return eventData?.tickets.length || 0;
  }
  
}

// lottery ticket function
export const UserSubscribeForEvent = async(
  userId: string,
  eventId: string,
) => {
  const checkSubResult = await db.subscribeTicket.findMany({
    where: {
      userId: userId,
      eventId: eventId
    }
  })
  if (Array.isArray(checkSubResult) && checkSubResult.length === 0) {
    return true
  }
  return false
}