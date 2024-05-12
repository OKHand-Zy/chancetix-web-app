"use client";

import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/Shadcn/card";
import { Button } from "@/components/ui/Shadcn/button";

import React from 'react';
import CountStore from '@/store/CountStore'

function CountShow() {
  const count = CountStore((state) => state.bears)
  return <h2>Count: {count}</h2>
}

function CountIncre() {
  const increment = CountStore((state) => state.addABear)
  return <button onClick={increment}>Increment</button>
}

const BPage = () => {
  //const { count, increment } = CountStore();
  //const bears = CountStore((state) => state.count)

  return (
    <div>
      <h1>Page B</h1>
      <CountShow />
      <CountIncre />
    </div>
  );
};

export default BPage;
