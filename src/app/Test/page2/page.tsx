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

const BPage = () => {
  //const { count, increment } = CountStore();
  //const bears = CountStore((state) => state.count)

  return (
    <div>
      <h1>Page B</h1>
      <CountShow />
      <div className="flex col gap-2">
        <CountIncre />
        <CountReset />
        <Button asChild variant="outline">
          <Link href="/Test/page1">
            Go To PageA
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

export default BPage;
