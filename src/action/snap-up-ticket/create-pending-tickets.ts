"use server";
import * as z from "zod";
import { db } from "@/lib/db";

import { SnapUpBuyTicketSchema } from "@/schemas";

import { getEventsByName } from "@/data/event";

export const createPendingTicket = async (
  values: z.infer<typeof SnapUpBuyTicketSchema>,
) => {
  const validatedFields = SnapUpBuyTicketSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const eventName = validatedFields.data.ticketName;
  const eventInfo = await getEventsByName(eventName);
  const eventId = eventInfo?.id;
  const ticketType = validatedFields.data.ticketType;
  const tickets = validatedFields.data.tickets;

  tickets.map(async (buyTicket) => {
    // 獲取所有存在的序號
    const tickets_SN = await db.ticket.findMany({
      select: {
        serialNumber: true,
      },
      where: {
        eventId: eventId,
        serialNumber: {
          startsWith: buyTicket.ticketGroup,
        },
      },
      orderBy: {
        serialNumber: 'asc',
      },
    });

    const existingSerialNumbers = tickets_SN.map(t => t.serialNumber)
    console.log(existingSerialNumbers)

    /*
    // 假設序號格式為 AC-001, AC-002 等
    const prefix = `${buyTicket.ticketGroup}-`
    const padding = 3

    // 找出最大序號
    if (existingSerialNumbers && existingSerialNumbers.length > 0) {
      const maxSN = existingSerialNumbers[existingSerialNumbers.length - 1] || ''
      const maxNumber = parseInt(maxSN.substring(prefix.length))
      
      // 生成完整的序號列表
      const allSerialNumbers = Array.from({ length: maxNumber }, (_, i) => 
        `${prefix}${String(i + 1).padStart(padding, '0')}`
      )

      // 找出缺失的序號
      const missingSN = allSerialNumbers.filter(sn => !existingSerialNumbers.includes(sn))
      console.log(missingSN)
    }
    */
  })

  

}