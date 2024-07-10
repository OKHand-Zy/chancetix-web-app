"use server";
import * as z from "zod";
import { db } from "@/lib/db";

import { SnapUpBuyTicketSchema } from "@/schemas";

import { getEventsByName } from "@/data/event";
import { currentUser } from "@/lib/auth";

export const createPendingTicket = async (
  values: z.infer<typeof SnapUpBuyTicketSchema>,
) => {
  const user = await currentUser();
  const validatedFields = SnapUpBuyTicketSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const userId = user?.id
  const eventName = validatedFields.data.ticketName;
  const eventInfo = await getEventsByName(eventName);
  const eventId = eventInfo?.id;
  const ticketType = validatedFields.data.ticketType;
  const tickets = validatedFields.data.tickets;

  tickets.map(async (buyTicket) => {
    const groupTicketData = await db.ticketGroups.findFirst({
      where: {
        eventId: eventId,
        groupName: buyTicket.ticketGroup,
      },
    })
    const ticketPrice = groupTicketData?.price
    const ticketCapacity = groupTicketData?.groupCapacity

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

      const findSequentialSNs = (missingSN: string[], count: number, prefix: string): string[] | null => {
        for (let i = 0; i <= missingSN.length - count; i++) {
          let isSequential = true;
          for (let j = 0; j < count - 1; j++) {
            const currentSN = parseInt(missingSN[i + j].substring(prefix.length));
            const nextSN = parseInt(missingSN[i + j + 1].substring(prefix.length));
            if (nextSN !== currentSN + 1) {
              isSequential = false;
              break;
            }
          }
          if (isSequential) {
            return missingSN.slice(i, i + count);
          }
        }
        return null;
      };
      
      const generateNewSN = (prefix: string, maxNumber: number, padding: number, count: number): string[] => {
        return Array.from({ length: count }, (_, i) => 
          `${prefix}${String(maxNumber + i).padStart(padding, '0')}`
        );
      };
      
      if (missingSN.length >= 1 && buyTicket.ticketCount === 1) {
        // ticketCount 為 單數且 missingSN 有的話
        const pendingSN = missingSN[0];
        // create pending ticket
        await db.pendingTicket.create({
          data: {
            user: {
              connect: {
                id: userId,
              },
            },
            Event: {
              connect: {
                id: eventId,
              },
            },
            serialNumber: pendingSN,
            ticketType: ticketType,
            ticketGroup: buyTicket.ticketGroup,
            position: 'free', // Using default value
            customerName: 'unknown', // Using default value
            price: ticketPrice, // Assuming buyTicket contains price information
            expires: new Date(Date.now() + 15 * 60 * 1000), // Setting expiration to 15 minutes from now
          }
        });
      } else if (missingSN.length >= buyTicket.ticketCount) {
        // ticketCount 為雙數且 missingSN 有連號的話
        const sequentialSNs = findSequentialSNs(missingSN, buyTicket.ticketCount, prefix);
        if (sequentialSNs) {
          // create pending ticket
          sequentialSNs.map(async (sn) => {
            await db.pendingTicket.create({
              data: {
                user: {
                  connect: {
                    id: userId,
                  },
                },
                Event: {
                  connect: {
                    id: eventId,
                  },
                },
                serialNumber: sn,
                ticketType: ticketType,
                ticketGroup: buyTicket.ticketGroup,
                position: 'free', // Using default value
                customerName: 'unknown', // Using default value
                price: ticketPrice, // Assuming buyTicket contains price information
                expires: new Date(Date.now() + 15 * 60 * 1000), // Setting expiration to 15 minutes from now
              }
            });
          })
        } else {
          // 沒有連號的話
          const newSNs = generateNewSN(prefix, maxNumber, padding, buyTicket.ticketCount);
          // create pending ticket
          newSNs.map(async (sn) => {
            await db.pendingTicket.create({
              data: {
                user: {
                  connect: {
                    id: userId,
                  },
                },
                Event: {
                  connect: {
                    id: eventId,
                  },
                },
                serialNumber: sn,
                ticketType: ticketType,
                ticketGroup: buyTicket.ticketGroup,
                position: 'free', // Using default value
                customerName: 'unknown', // Using default value
                price: ticketPrice, // Assuming buyTicket contains price information
                expires: new Date(Date.now() + 15 * 60 * 1000), // Setting expiration to 15 minutes from now
              }
            });
          })
        }
      } else {
        // 產生新的 SN
        const newSNs = generateNewSN(prefix, maxNumber, padding, buyTicket.ticketCount);
        // create pending ticket
        newSNs.map(async (sn) => {
          await db.pendingTicket.create({
            data: {
              user: {
                connect: {
                  id: userId,
                },
              },
              Event: {
                connect: {
                  id: eventId,
                },
              },
              serialNumber: sn,
              ticketType: ticketType,
              ticketGroup: buyTicket.ticketGroup,
              position: 'free', // Using default value
              customerName: 'unknown', // Using default value
              price: ticketPrice, // Assuming buyTicket contains price information
              expires: new Date(Date.now() + 15 * 60 * 1000), // Setting expiration to 15 minutes from now
            }
          });
        })
      }
    }
  });
};