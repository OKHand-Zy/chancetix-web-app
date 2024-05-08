"use client"

import React, { useState, useEffect } from 'react';

import { Button } from '@/components/ui/Shadcn/button';
import {
  Card,
  CardDescription,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Shadcn/card"

import { SellFromNavbar } from './sell-from-Navbar';
import ChooseTicketLen from "./chooseticket_len";

import { SubscribeTickets } from '@/action/lottery-ticket/subscribe';
import { useCurrentUser } from "@/hooks/use-current-user";

interface SellFromProps {
  activityName: string;
  ticketType: string;
  NavBarTitle : string;
  NavBarDescription : string;
  volunteerList : { label: string, value: string }[];
}

export const SellFrom: React.FC<SellFromProps> = ({ 
  activityName,
  ticketType,
  NavBarTitle, 
  NavBarDescription, 
  volunteerList 
}) => {
  const session_user = useCurrentUser();

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
    <Card className="w-8/12">
      
      <CardHeader className="text-center">
        <SellFromNavbar 
          title={NavBarTitle} 
          description={NavBarDescription} 
        /> 
      </CardHeader>

      <CardContent className="flex justify-center items-center flex-col gap-y-4">
        <ChooseTicketLen 
          fromName = "First Volunteer"
          volunteerList={volunteerList} 
        />
        <ChooseTicketLen 
          fromName = "Second Volunteer"
          volunteerList={volunteerList} 
        />
      </CardContent>
      <CardFooter className='lex justify-center items-center'>
        <Button>
          Submit
        </Button>
      </CardFooter>
    </Card>
    </div>
  )
};