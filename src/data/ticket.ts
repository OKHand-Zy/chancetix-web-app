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