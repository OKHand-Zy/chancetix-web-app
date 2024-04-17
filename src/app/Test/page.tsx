"use client";
import { useTransition, useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/Shadcn/card";
import { Button } from "@/components/ui/Shadcn/button";

import * as z from "zod";
import { ticketSchema } from "@/schemas";
import { findTransferTicket } from "@/action/find-transferTicket";
import { useSession } from "next-auth/react";

const TestPage = () => {
  const session = useSession();

  const onClick = (
    values: z.infer<typeof ticketSchema>
  ) => {
    findTransferTicket(values).then((data) => {
      console.log(data)
    })
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
          const userId = session.data?.user?.id;
          if (userId) {
            onClick({ userId });
          }
        }}>
          Test Button
        </Button>
      </CardContent>
    </Card>
  );
};

export default TestPage;
