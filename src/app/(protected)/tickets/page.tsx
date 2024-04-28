"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/Shadcn/card";
import { useEffect, useState } from "react";
import { findAllTicketbyUserId } from "@/action/find-userTicket";
import { useSession } from "next-auth/react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Shadcn/table"

import {TicketCard} from "@/app/(protected)/tickets/_components/ticket_card"

type Ticket = {
  id: number;
  username: string;
  eventname: string;
  price: number;
  status: string; // 假設 TicketStatus 是你定義的一個類型
  transfer: boolean;
};

const TicketsPage = () => {
  const session = useSession();
  const userId = session.data?.user?.id;
  const [tickets, setTickets] = useState<Ticket[] | { error: string }>([]);

  useEffect(() => {
    if (userId) {
      findAllTicketbyUserId({userId})
        .then(foundTickets => {
          setTickets(foundTickets as Ticket[] || { error: "No have tickets" }); // 現在這裡的資料可以是 Ticket[] 或 { error: string }
        })
        .catch(error => {
          console.error("Failed to fetch tickets:", error);
          // 這裡可以處理錯誤，例如顯示一個錯誤訊息
        })
    }
  }, [userId]);

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          🎫 Tickets
        </p>
      </CardHeader>
      <CardContent className="space-y-4">

        {Array.isArray(tickets) ? (
          tickets.map((ticket, index) => (
              <div key={index} className="flex justify-center items-center mb-2">
                <TicketCard 
                  eventname={ticket.eventname} 
                >
                  <div className="grid grid-cols-2 text-left">
                    <p>持有者: {ticket.username}</p>
                    <p>是否轉贈: {ticket.transfer ? 'Yes' : 'No'}</p>
                    <p>價錢: {ticket.price}</p>
                    <p>狀態: {ticket.status}</p>
                  </div>
                </TicketCard>
              </div>
            ))
        ) : (
          <div className="flex justify-center items-center mb-2">
              <div className="text-center">Error: {tickets.error}</div>
          </div>
        )}

      </CardContent>
    </Card>
  );
};

export default TicketsPage
