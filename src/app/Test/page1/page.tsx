"use client";

import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/Shadcn/card";
import { Button } from "@/components/ui/Shadcn/button";
import Link from 'next/link';
import React from 'react';
import CountStore from '@/store/CountStore'

function CountShow() {
  const count = CountStore((state) => state.bears)
  return (
    <h2>
      Count: {count}
    </h2>
  )
}

function CountIncre() {
  const increment = CountStore((state) => state.addABear)
  return (
    <Button onClick={increment}>
      Increment
    </Button>
  )
}

function CountReset() {
  const reset = CountStore((state) => state.restBears)
  return (
    <Button onClick={reset}>
      Reset
    </Button>
  )
}

const APage = () => {
  //const { count, increment } = CountStore();

  return (
    <div>
      <h1>Page A</h1>
      <CountShow />
      <div className="flex col gap-2">
        <CountIncre />
        <CountReset />
        <Button asChild variant="outline">
          <Link href="/Test/page2">
            Go To PageB
          </Link>
        </Button>
        <Button 
          onClick={() => {CountStore.persist.clearStorage()}}
        >
          Clear Store
        </Button>
      </div>
    </div>
  );
};

export default APage;
