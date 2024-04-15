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
          setTickets(foundTickets); // 現在這裡的資料可以是 Ticket[] 或 { error: string }
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
      <Table>
        <TableCaption>A list of your all tickets.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Event:</TableHead>
            <TableHead>ID:</TableHead>
            <TableHead>Price:</TableHead>
            <TableHead >Status:</TableHead>
            <TableHead>Transfer:</TableHead>
            <TableHead>User:</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.isArray(tickets) ? (
            tickets.map((ticket, index) => (
              <TableRow key={index}>
                <TableCell>{ticket.eventname}</TableCell>
                <TableCell>{ticket.id}</TableCell>
                <TableCell>{ticket.price}</TableCell>
                <TableCell>{ticket.status}</TableCell>
                <TableCell>{ticket.transfer ? 'Yes' : 'No'}</TableCell>
                <TableCell>{ticket.username}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6}>Error: {tickets.error}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      </CardContent>
    </Card>
  );
};

export default TicketsPage
