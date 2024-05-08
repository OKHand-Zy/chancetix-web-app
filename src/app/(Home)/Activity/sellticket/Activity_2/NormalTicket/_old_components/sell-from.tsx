"use client"

import React, { useState, useEffect } from 'react';

import { Button } from '@/components/ui/Shadcn/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Shadcn/card"

import { SellFromNavbar } from './sell-from-Navbar';
import SellTicketLen from "./sellticket_len";

import { SubscribeTickets } from '@/action/lottery-ticket/subscribe';
import { useCurrentUser } from "@/hooks/use-current-user";

interface SellFromProps {
  activityName: string;
  ticketType: string;
  ticketGroup: string;
}

export const SellFrom: React.FC<SellFromProps> = ({ activityName, ticketType, ticketGroup }) => {
  const [N1Count, setN1Count] = useState<number>(0);
  const [N2Count, setN2Count] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const session_user = useCurrentUser();

  useEffect(() => {
    setTotalCount(N1Count + N2Count);
  }, [N1Count, N2Count]);

  const handleShowTotalCount = async () => {
    const userId = session_user?.id
    const ticketCount = totalCount
    if (userId) {
      const result = await SubscribeTickets({userId , activityName, ticketType , ticketGroup, ticketCount});
      console.log(result)
    }
  };

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
    <Card className="w-8/12">
      
      <CardHeader className="text-center">
        <SellFromNavbar title="ABC-Normal" description="Hello" /> 
      </CardHeader>

      <CardFooter className="flex justify-center flex-col">
        <SellTicketLen
            label="Normal-1"
            onCountChange={(newCount) => {
              setN1Count(newCount);
              console.log("Normal-1 : " + newCount);
            }}
            totalCount={totalCount}
          />
          <SellTicketLen
            label="Normal-2"
            onCountChange={(newCount) => {
              setN2Count(newCount);
              console.log("Normal-2 : " + newCount);
            }}
            totalCount={totalCount}
          />
          
      </CardFooter>
      <div className='flex justify-center p-4'>
        <Button onClick={handleShowTotalCount}>
            Show Total Count
        </Button>
      </div>
    </Card>
    </div>
  )
}

