import {db} from "@/lib/db";

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

