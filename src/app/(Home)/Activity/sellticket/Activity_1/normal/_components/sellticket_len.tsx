"use client";

import { Button } from "@/components/ui/Shadcn/button";
import React, { useState } from 'react';

import STicketFromStore from '@/store/STicketFromStore'

interface SellTicketLenProps {
  label?: string;
}

const SellTicketLen: React.FC<SellTicketLenProps> = ({ 
  label = 'Ticket_Name', 
}) => {
  // zustand 訂閱值 保持在最新的狀態
  const {z_AcName, z_ticketType, z_tickets} = STicketFromStore((state) => ({
    z_AcName: state.activityName,
    z_ticketType: state.ticketType,
    z_tickets: state.tickets,
  }));

  const increment = () => {
    const ticketsData = STicketFromStore.getState().tickets;
    const totalCount = ticketsData.reduce((acc, ticket) => acc + ticket.count, 0);
    const ticket = ticketsData.find(ticket => ticket.group === label);
    if (ticket && totalCount < 4 || ticket && ticket.count < 4 ) {
      const newCount = ticket.count + 1;
      STicketFromStore.getState().updateTicketCount(label, newCount);
    }
  };

  const decrement = () => {
    const ticketsData = STicketFromStore.getState().tickets;
    const ticket = ticketsData.find(ticket => ticket.group === label);
    if (ticket && ticket.count > 0) {
      const newCount = ticket.count - 1;
      STicketFromStore.getState().updateTicketCount(label, newCount);
    }
  };

  const count = STicketFromStore.getState().tickets.find(ticket => ticket.group === label)?.count || 0;
  const totalCount = STicketFromStore.getState().tickets.reduce((acc, ticket) => acc + ticket.count, 0);

  return (
  <>
    <div className="flex grid-rows-2 justify-around gap-12 p-2">
      <p>{label}</p>
      <div className="flex justify-around gap-4">
        {totalCount < 4 
          ? <Button variant="outline" onClick={increment}>+</Button>
          : <Button variant="outline" disabled>+</Button>
        }
        <p>{count}</p>
        {totalCount > 0
          ? <Button variant="outline" onClick={decrement}>-</Button>
          : <Button variant="outline" disabled>-</Button>
        }
      </div>
    </div>
  </>
  );
};

export default SellTicketLen;