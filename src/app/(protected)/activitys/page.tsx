"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/Shadcn/card";
import { useEffect, useState } from "react";
import { findAllTicketbyUserId } from "@/action/find-userTicket";
import { findAllActivitybyUserId } from "@/action/find-userActivity";
import { useSession } from "next-auth/react";

import Link from "next/link";

import { Button } from "@/components/ui/Shadcn/button";

import {TicketCard} from "@/app/(protected)/tickets/_components/ticket_card"


type Ticket = {
  serialNumber: string;
  userName: string;
  userEmail: string;
  eventname: string;
  ticketType: string,
  ticketGroup: string,
  position: string,
  price: number;
  status: string; // 假設 TicketStatus 是你定義的一個類型
};

const ActivitysPage = () => {
  const session = useSession();
  const userId = session.data?.user?.id || "";
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
          🎪 Activitys
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className='flex justify-center p-10'>
          <Button onClick={() => findAllActivitybyUserId({userId})}>
            Create Activity
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivitysPage
