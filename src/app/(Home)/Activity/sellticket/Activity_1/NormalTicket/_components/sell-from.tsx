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

import SellTicketLen from "./sellticket_len";

import { checkSellTickets } from '@/action/sellticket/check-tickets';

interface SellFromProps {
  activityName: string;
  ticketType: string;
  ticketGroup: string;
}

export const SellFrom: React.FC<SellFromProps> = ({ activityName, ticketType, ticketGroup }) => {
  const [N1Count, setN1Count] = useState<number>(0);
  const [N2Count, setN2Count] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  
  useEffect(() => {
    setTotalCount(N1Count + N2Count);
  }, [N1Count, N2Count]);

  const handleShowTotalCount = async () => {
    if (totalCount <= 0) {
      return; // 直接返回，不進行任何操作
    }
    const result = await checkSellTickets({ activityName, ticketType , ticketGroup });
    if (typeof result === 'number') {
      if (result > N1Count) {
        alert(result);
      }
    } else if (typeof result === 'object' && result.error) {
      alert(result.error);
    }
  };

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
    <Card className="w-8/12">
      <CardHeader className="text-center">
        <CardTitle className="text-4xl">ABC-Normal</CardTitle>
        <CardDescription>
          Descrip the page Sell from.
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-center flex-col">
        <SellTicketLen
            label="Normal-1"
            onCountChange={(newCount) => {
              setN1Count(newCount);
              console.log("Normal-1 : " + newCount);
            }}
          />
          <SellTicketLen
            label="Normal-2"
            onCountChange={(newCount) => {
              setN2Count(newCount);
              console.log("Normal-2 : " + newCount);
            }}
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

