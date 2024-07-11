"use server";
import * as z from "zod";
import { db } from "@/lib/db";
import { userIdSchema } from "@/schemas";
import { getEventByUserId } from "@/data/event";
import { getEventsById } from "@/data/event";
import { getUserById } from "@/data/user"

export const findAllActivitybyUserId = async (
  values: z.infer<typeof userIdSchema>,
) => {
  const validatedFields = userIdSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { userId } = validatedFields.data;
  const existingUserTicket = await getEventByUserId(userId);

  // 如果沒有票，返回空的票數組
  if (existingUserTicket.length === 0) {
    return [];
  }
  console.log(existingUserTicket)
  /*
   // 並行處理：同時獲取用戶名稱和事件資訊
  const [userName, eventInfo] = await Promise.all([
    getUserById(userId),
    Promise.all(existingUserTicket.map(ticket => getEventsById(ticket.eventId))),
  ]);
  
  if (!userName || !eventInfo) {
    return { error: "Invalid fields!" };
  }

  const TicketData = existingUserTicket.map((ticket, index) => ({
    serialNumber: ticket.serialNumber,
    userName: userName.name,
    userEmail: userName.email, 
    eventname: eventInfo[index]?.name, // 使用獲取到的事件名稱
    ticketType: ticket.ticketType,
    ticketGroup: ticket.ticketGroup,
    position: ticket.position,
    price: ticket.price,
    status: ticket.status,
  }));
  return TicketData
  */
}