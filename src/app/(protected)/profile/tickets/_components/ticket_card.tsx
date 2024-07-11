'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
} from '@/components/ui/Shadcn/card';

import {TicketCardOptions} from "@/app/(protected)/profile/tickets/_components/data-table-row-actions"

interface TicketCardProps {
  ticket: {
    serialNumber: string,
    userName: string,
    userEmail: string,
    eventname: string,
    ticketType: string,
    ticketGroup: string,
    position: string,
    price: number,
    status: string,
  }
}

export const TicketCard = ({
  ticket,
}: TicketCardProps) => {
  return (
    <Card className="bg-lime-300 text-center w-full shadow-md p-4">
      <CardTitle>
        {ticket.eventname}
      </CardTitle>
      <CardContent className="flex justify-between items-center">
        <div className="flex-1 flex justify-center">

          <div className="grid grid-cols-2 items-center">
            <p>持有者：{ticket.userName}</p>
            <p>票卷序號：{ticket.serialNumber}</p>
            <p>票卷種類：{ticket.ticketType}</p>
            <p>座位種類：{ticket.ticketGroup}</p>
            <p>座位區域：{ticket.position}</p>
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
