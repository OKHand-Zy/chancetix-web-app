"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/Shadcn/card";
import { useEffect, useState } from "react";
import { findAllTicketbyUserId } from "@/action/find-userTicket";
import { useSession } from "next-auth/react";


function TicketUserStep1Page() {
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          🎫 Tickets
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>Step1</div>
      </CardContent>
    </Card>
  );
}

export default TicketUserStep1Page;