"use client";
import { useTransition, useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/Shadcn/card";
import { Button } from "@/components/ui/Shadcn/button";

import * as z from "zod";

import { useSession } from "next-auth/react";



const TestPage = () => {
  const session = useSession();

  const onClick = () => {
    const systemTime = new Date()
    const taipeiTime = new Date(systemTime.toLocaleString("en-US", { timeZone: "Asia/Taipei" }));
    const prismaTime = taipeiTime.toISOString();

    console.log(prismaTime);
  }

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          ⚙️Test
        </p>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Button onClick={() => {
          onClick()
        }}>
          Test Button
        </Button>
      </CardContent>
    </Card>
  );
};

export default TestPage;
