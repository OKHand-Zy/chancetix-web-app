"use server";
import * as z from "zod";
import { db } from "@/lib/db";
import { ticketSchema } from "@/schemas";
import { getTicketByUserId } from "@/data/ticket";
import { getEventsInfo } from "@/data/event";
import { getUserById } from "@/data/user"

export const findAllTicketbyUserId = async (
  values: z.infer<typeof ticketSchema>,
) => {
  const validatedFields = ticketSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { userId } = validatedFields.data;
  const existingUserTicket = await getTicketByUserId(userId);

   // 並行處理：同時獲取用戶名稱和事件資訊
  const [userName, eventInfo] = await Promise.all([
    getUserById(userId),
    Promise.all(existingUserTicket.map(ticket => getEventsInfo(ticket.eventId))),
  ]);
  
  const TicketData = existingUserTicket.map((ticket, index) => ({
    id: ticket.id,
    username: userName?.name || 'unknown', // 假設你想要使用 userId 作為 username
    eventname: eventInfo[index]?.name || 'unknown', // 使用獲取到的事件名稱
    price: ticket.price,
    status: ticket.status,
    transfer: ticket.transfer,
  }));
  
  return TicketData
}