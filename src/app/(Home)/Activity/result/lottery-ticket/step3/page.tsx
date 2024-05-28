"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/Shadcn/card";
import { useEffect, useState } from "react";
import { findAllTicketbyUserId } from "@/action/find-userTicket";
import { useSession } from "next-auth/react";


function TicketUserStep3Page() {
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          🎫 Tickets
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>Good Luck!</div>
      </CardContent>
    </Card>
  );
}

export default TicketUserStep3Page;