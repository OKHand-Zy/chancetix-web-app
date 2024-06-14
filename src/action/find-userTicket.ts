"use server";
import * as z from "zod";
import { db } from "@/lib/db";
import { userIdSchema } from "@/schemas";
import { getTicketByUserId } from "@/data/ticket";
import { getEventsById } from "@/data/event";
import { getUserById } from "@/data/user"

export const findAllTicketbyUserId = async (
  values: z.infer<typeof userIdSchema>,
) => {
  const validatedFields = userIdSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { userId } = validatedFields.data;
  const existingUserTicket = await getTicketByUserId(userId);

  // 如果沒有票，返回空的票數組
  if (existingUserTicket.length === 0) {
    return [];
  }

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
    ticketType: ticket.tickettype,
    ticketGroup: ticket.ticketGroup,
    position: ticket.position,
    price: ticket.price,
    status: ticket.status,
    transfer: ticket.transfer,
  }));
  
  return TicketData
}