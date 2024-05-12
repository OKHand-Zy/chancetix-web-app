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

const APage = () => {
  //const { count, increment } = CountStore();

  return (
    <div>
      <h1>Page A</h1>
      <CountShow />
      <CountIncre />
    </div>
  );
};

export default APage;
