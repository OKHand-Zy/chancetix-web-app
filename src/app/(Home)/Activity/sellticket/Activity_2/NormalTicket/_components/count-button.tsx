"use client";

import { Button } from "@/components/ui/Shadcn/button";
import { table } from "console";
import React, { useEffect, useState } from 'react';

import LTicketFromStore from '@/store/LTicketFromStore'


interface CButtonProps {
  VType: string,
}

const CountButton: React.FC<CButtonProps> = ({ 
  VType,
}) => {
  function TicketCount() {
    if (VType === "FV") {
      const count = LTicketFromStore((state) => state.FVCount)
      return(
        <p>{count}</p>
      )
    } 
    if (VType === "SV") {
      const count = LTicketFromStore((state) => state.SVCount)
      return(
        <p>{count}</p>
      )
    }
  }

  function IncrementButton() { 
    if (VType === "FV") {
      const addTicket = LTicketFromStore((state) => state.addFVTCount);
      const count = LTicketFromStore((state) => state.FVCount);
      return(
        <Button 
          variant="outline" 
          onClick={addTicket}
          disabled={count >= 4}
        >
          +
        </Button>
      )
    }
    if (VType === "SV") {
      const addTicket = LTicketFromStore((state) => state.addSVTCount);
      const count = LTicketFromStore((state) => state.SVCount);
      return(
        <Button 
          variant="outline" 
          onClick={addTicket}
          disabled={count >= 4}
        >
          +
        </Button>
      )
    }
  }

  function DecrementButton() {
    if (VType === "FV") {
      const decTicket = LTicketFromStore((state) => state.decFVTCount);
      const count = LTicketFromStore((state) => state.FVCount);
      return(
        <Button 
          variant="outline" 
          onClick={decTicket}
          disabled={count == 0}
        >
          -
        </Button>
      )
    }
    if (VType === "SV") {
      const decTicket = LTicketFromStore((state) => state.decSVTCount);
      const count = LTicketFromStore((state) => state.SVCount);
      return(
        <Button 
          variant="outline" 
          onClick={decTicket}
          disabled={count == 0}
        >
          -
        </Button>
      )
    }
  }

  return (
  <>
    <div className="flex grid-rows-2 justify-around gap-12 p-2">
      <div className="flex justify-around gap-4">
        <IncrementButton />
        <TicketCount />
        <DecrementButton />
      </div>
    </div>
  </>
  );
};

export default CountButton;