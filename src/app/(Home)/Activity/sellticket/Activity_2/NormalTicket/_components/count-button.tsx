"use client";

import { Button } from "@/components/ui/Shadcn/button";
import { table } from "console";
import React, { useState } from 'react';

interface CButtonProps {
  initialCount?: number;
  onCountChange?: (value: number) => void;
  totalCount?: number;
  status?: boolean;
}

const CountButton: React.FC<CButtonProps> = ({ 
  initialCount = 0, 
  onCountChange ,
  totalCount = 0,
  status,
}) => {
  const [count, setCount] = useState<number>(initialCount);

  const increment = () => {
    if (count < 4 && totalCount < 4 && status === true) {
      const newCount = count + 1;
      setCount(newCount);
      if (onCountChange) {
        onCountChange(newCount);
      }
    }
  };

  const decrement = () => {
    if (count > 0 && status === true) {
      const newCount = count - 1;
      setCount(newCount);
      if (onCountChange) {
        onCountChange(newCount);
      }
    }
  };

  return (
  <>
    <div className="flex grid-rows-2 justify-between gap-12 p-2">
      <div className="flex justify-between gap-4">
        <Button variant="outline" onClick={increment} disabled={count >= 4 || status === false}>
          +
        </Button>
        <p>{count}</p>
        <Button variant="outline" onClick={decrement} disabled={status === false}>
          -
        </Button>
      </div>
    </div>
  </>
  );
};

export default CountButton;