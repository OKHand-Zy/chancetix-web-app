"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/Shadcn/card";
import { useEffect, useState } from "react";
import { findAllTicketbyUserId } from "@/action/find-userTicket";
import { findAllActivitybyUserId } from "@/action/find-userActivity";
import { useSession } from "next-auth/react";

import Link from "next/link";

import { Button } from "@/components/ui/Shadcn/button";

import {TicketCard} from "@/app/(protected)/profile/tickets/_components/ticket_card"


type Evet = {
  id: string,
  name: string,
  date: Date,
  location: string,
  capacity: number,
  image: string,
  hostId: string
};

const ActivitysPage = () => {
  const session = useSession();
  const userId = session.data?.user?.id || "";
  const [events, setEvents] = useState<Evet[] | { error: string }>([]);

  useEffect(() => {
    if (userId) {
      findAllActivitybyUserId({userId})
        .then(foundEvents => {
          setEvents(foundEvents as Evet[] || { error: "No have Events" }); // 現在這裡的資料可以是 Ticket[] 或 { error: string }
        })
        .catch(error => {
          console.error("Failed to fetch Events:", error);
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
        
        {Array.isArray(events) ? (
          events.map((event, index) => (
              <div key={index} className="flex justify-center items-center mb-2">
                <p>{event.name}</p>
              </div>
            ))
        ) : (
          <div className="flex justify-center items-center mb-2">
              <div className="text-center">Error: {events.error}</div>
          </div>
        )}

        <div className='flex justify-center p-2'>
          <Button asChild>
            <Link href="/activitys/create">
              Create Activity
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivitysPage
