'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
} from '@/components/ui/Shadcn/card';

import {TicketCardOptions} from "@/app/(protected)/tickets/_components/data-table-row-actions"

interface TicketCardProps {
  ticket: {
    serialNumber: string,
    username: string,
    eventname: string,
    price: number,
    status: string,
    transfer: boolean,
  }
}

export const TicketCard = ({
  ticket,
}: TicketCardProps) => {
  return (
    <Card className="bg-lime-300 text-center w-full shadow-md p-4">
      <CardTitle>
        {ticket.eventname +"－"+ ticket.serialNumber}
      </CardTitle>
      <CardContent className="flex justify-between items-center">
        <div className="flex-1 flex justify-center">
          <div className="grid grid-cols-2 items-center">
            <p>持有者: {ticket.username}</p>
            <p>是否轉贈: {ticket.transfer ? 'Yes' : 'No'}</p>
            <p>價錢: {ticket.price}</p>
            <p>狀態: {ticket.status}</p>
            
          </div>
        </div>
        <div>
          <TicketCardOptions ticketData={ticket}/>
        </div>
      </CardContent>

    </Card>
  );
};
