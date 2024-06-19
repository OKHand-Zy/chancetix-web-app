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

export const getTansferTicketByUserId = async (
  userId: string
) => {
  const ticket = await db.ticket.findMany({
    where: {
      userId,
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
  const eventData = await db.event.findUnique({
    where: {
      id: eventId,
    },
    include: {
      tickets: {
        where: {
          ticketType: ticketType,
          ticketGroup: ticketGroup
        },
      }
    }
  });
    return eventData?.tickets.length || 0;
}

export const getPendingTicketCountForEvent = async(
  eventId: string,
  ticketType: string,
  ticketGroup: string
) => {
  // 查詢特定事件並包含其所有票數
  const count = await db.pendingTicket.count({
    where: {
      eventId: eventId,
      ticketType: ticketType,
      ticketGroup: ticketGroup,
    },
  });
  return count;
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

export const LTixUpdateSerNumber = async (
  activityName: string
) => {
  const lastSerialNumberData = await db.lTicket.findMany({
    where: {
      activityName: activityName
    },
    orderBy: {
      acSerNumber: 'asc',
    },
    take: -1,
  })
  return lastSerialNumberData
}