"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

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
import { createPendingTicket } from '@/action/snap-up-ticket/create-pending-tickets';
import STicketFromStore from '@/store/STicketFromStore'

interface SellFromProps {
  activityName: string;
  ticketType: string;
  ticketGroup: string[];
}

export const SellFrom: React.FC<SellFromProps> = ({ activityName, ticketType, ticketGroup}) => {
  const router = useRouter();
  const [dialogStatus, setDialogStatus] = useState<boolean>(false);
  const [dialogMessage, setDialogMessage] = useState<string>("");
  const [ticketStatus, setTicketStatus] = useState<string[]>(ticketGroup.map(() => ""));

  // zustand 訂閱值 保持在最新的狀態
  const {z_AcName, z_ticketType, z_tickets} = STicketFromStore((state) => ({
    z_AcName: state.activityName,
    z_ticketType: state.ticketType,
    z_tickets: state.tickets,
  }));
  
  useEffect(() => {
    const fetchTicketStatus = async () => {
      const statuses = await Promise.all(ticketGroup.map(async (group) => {
        const result = await checkSellTickets({ activityName, ticketType, ticketGroup: group });
        return result?.status || "Unknown";
      }));
      setTicketStatus(statuses);
    };
    fetchTicketStatus();
  }, [activityName, ticketType, ticketGroup]);

  const handleShowTotalCount = async () => {
    
    // change to zustand valume
    const totalCount = z_tickets.reduce((acc, ticket) => acc + ticket.count, 0);
    if (totalCount <= 0) {
      return;
    }
  
    // 過濾出計數大於 1 的項目
    const buyTickets = z_tickets.filter(ticket => ticket.count >= 1);
    let messages: string[] = [];
  
    try {
      await Promise.all(buyTickets.map(async (ticket) => {
        const result = await checkSellTickets({ activityName, ticketType, ticketGroup: ticket.group });

        if (result && result.error) {
          messages.push(result.error);
        } else if (result && (result.status === "sellOut" || result.status === "Pending")) {
          messages.push(`${ticket.group}'s ticket ${result.status}`);
        }
      }));
    } catch (error) {
      console.error("Error while fetching and processing results:", error);
      // Handle error as needed
    }

    // find postion add pennding ticket
    const buyTicketsWithCount = buyTickets.map(ticket => ({
      ticketGroup: ticket.group,
      ticketCount: ticket.count,
    }));
    const creatResult = createPendingTicket({ buyUser: "test", ticketName: activityName, ticketType: ticketType, tickets: buyTicketsWithCount });
    // do here
    
    // forwrd to next page
    if (messages.length > 0) {
      setDialogMessage(messages.join(`\n`));
      setDialogStatus(true);
    } else {
      router.push(`/Activity/result/snap-up-ticket/step1`);
    }

  };

  const handleDialogClose = () => {
    setDialogStatus(false);
  };

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <Card className="w-8/12">
        <CardHeader className="text-center">
          <SellFromNavbar title="ABC-Normal" description="Snap-Up Mode Ticket" />
        </CardHeader>

        <CardFooter className="flex justify-center flex-col">
          {ticketGroup.map((group, index) => (
            <div key={index} className='flex justify-center items-center grid-rows-2 justify-around gap-12 p-2 border-b-4 border-slate-300'>
            <SellTicketLen
              label={group}
            />
            <p className='border-solid border-4 border-gray-300 p-2'>
              Ticket Status：{ticketStatus[index]}
            </p>
            </div>
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
                {dialogMessage.split('\n').map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
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