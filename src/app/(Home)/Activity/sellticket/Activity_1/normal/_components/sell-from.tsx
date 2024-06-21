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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/Shadcn/alert-dialog"

import { SellFromNavbar } from './sell-from-Navbar';
import SellTicketLen from "./sellticket_len";

import { checkSellTickets } from '@/action/snap-up-ticket/check-tickets';

interface SellFromProps {
  activityName: string;
  ticketType: string;
  ticketGroup: string[];
}

export const SellFrom: React.FC<SellFromProps> = ({ activityName, ticketType, ticketGroup}) => {
  const [counts, setCounts] = useState<number[]>(ticketGroup.map(() => 0));
  const [totalCount, setTotalCount] = useState<number>(0);
  const [dialogStatus, setDialogStatus] = useState<boolean>(false);
  const [dialogMessage, setDialogMessage] = useState<string>("");

  useEffect(() => {
    setTotalCount(counts.reduce((acc, count) => acc + count, 0));
  }, [counts]);

  const handleShowTotalCount = async () => {
    if (totalCount <= 0) {
      return;
    }
    /*
    const result = await checkSellTickets({ activityName, ticketType, ticketGroup });
    if (result?.status === "sell") {
      setDialogMessage(`Ticket Count: ${result.ticketCount}`);
    } else if (result?.status === "Pending") {
      setDialogMessage(`Ticket Count: ${result.TicketCount}`);
    } else if (result?.status === "sellOut") {
      setDialogMessage(`Ticket Count: ${result.TicketCount}`);
    }
    setDialogStatus(true);
    */
  };

  const handleDialogClose = () => {
    setDialogStatus(false);
  };

  const handleCountChange = (index: number, newCount: number) => {
    const newCounts = [...counts];
    newCounts[index] = newCount;
    setCounts(newCounts);
  };

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <Card className="w-8/12">
        <CardHeader className="text-center">
          <SellFromNavbar title="ABC-Normal" description="Snap-Up Mode Ticket" />
        </CardHeader>

        <CardFooter className="flex justify-center flex-col">
          {ticketGroup.map((group, index) => (
            <SellTicketLen
              key={index}
              label={group}
              onCountChange={(newCount) => {
                handleCountChange(index, newCount);
                console.log(`${group} : ${newCount}`);
              }}
              totalCount={totalCount}
            />
          ))}
        </CardFooter>
        <div className='flex justify-center p-4'>
          <Button onClick={handleShowTotalCount}>
            Show Total Count
          </Button>
        </div>

        <AlertDialog open={dialogStatus} onOpenChange={setDialogStatus}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Ticket Information</AlertDialogTitle>
              <AlertDialogDescription>
                {dialogMessage}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button onClick={handleDialogClose}>OK</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Card>
    </div>
  );
}

export default SellFrom;