"use client";

import { Button } from "@/components/ui/Shadcn/button";
import React, { useState } from 'react';

interface SellTicketLenProps {
  label?: string;
  initialCount?: number;
  onCountChange?: (count: number) => void;
}

const SellTicketLen: React.FC<SellTicketLenProps> = ({ label = 'Ticket_Name', initialCount = 0, onCountChange }) => {
  const [count, setCount] = useState<number>(initialCount);

  const increment = () => {
    if (count < 4){
      const newCount = count + 1;
      setCount(newCount);
      if (onCountChange) {
        onCountChange(newCount);
      }
    }
  };

  const decrement = () => {
    if (count > 0) {
      const newCount = count - 1;
      setCount(newCount);
      if (onCountChange) {
        onCountChange(newCount);
      }
    }
  };

  return (
  <>
    <div className="flex grid-rows-2 justify-between gap-12 p-2 border-b-4 border-slate-300	">
      <p>{label}</p>
      <div className="flex justify-between gap-4">
        <Button variant="outline" onClick={increment}>
          +
        </Button>
        <p>{count}</p>
        <Button variant="outline" onClick={decrement}>
          -
        </Button>
      </div>
    </div>
  </>
  );
};

export default SellTicketLen;