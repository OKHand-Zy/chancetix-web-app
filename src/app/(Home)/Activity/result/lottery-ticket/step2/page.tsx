"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Shadcn/card";
import { Button } from "@/components/ui/Shadcn/button";
import { Input } from "@/components/ui/Shadcn/input";
import Link from "next/link";
import { useRouter } from 'next/navigation';

import {ResultDataCheck} from '@/action/lottery-ticket/result-check'

import LTicketFromStore from '@/store/LTicketFromStore'
function TicketUserStep2Page() {
  const router = useRouter();
  
  const { FVolunteer, SVolunteer, FVCount, SVCount, ACName } = LTicketFromStore((state) => ({
    ACName: state.activityName,
    FVolunteer: state.FVolunteer,
    FVCount: state.FVCount,
    SVolunteer: state.SVolunteer,
    SVCount: state.SVCount,
  }));

  const handleBackClick = () => { 
    LTicketFromStore.getState().resetTicketData()
    LTicketFromStore.persist.clearStorage()
    router.push(`/Activity/info/${ACName}`);
  };

  const handleCreateTicket = async () => {
      const result = await ResultDataCheck({
        activityName: ACName,
        volunteer1: FVolunteer,
        v1tickets: FVCount,
        volunteer2: SVolunteer,
        v2tickets: SVCount
      });
      
  };

  return (
    <Card className="w-full text-center">
        
    <CardHeader>
      <CardTitle className="text-2xl font-semibold">
        🎫 Tickets User Info
      </CardTitle>
      <CardDescription className=""> 
        Input your User Info
      </CardDescription>
    </CardHeader>
    
    <CardContent className="space-y-4">
      
      <p>Volunteer 1：{FVolunteer}</p>
      {Array.from({ length: FVCount }).map((_, index) => (
        <div key={index} className="flex flex-row items-center justify-around gap-x-4">
          
          <p>Name：</p>
          <Input type="Name" placeholder="Name" />
          
          <p>Cellphone：</p>
          <Input maxLength={10} placeholder="Cellphone" />
          
          <p>Identity：</p>
          <Input maxLength={10} placeholder="Identity" />
        
        </div>
      ))}
      
      <hr/>
      
      <p>Volunteer 2：{SVolunteer}</p>
      {Array.from({ length: SVCount }).map((_, index) => (
        <div key={index} className="flex flex-row items-center justify-around gap-x-4">
          
          <p>Name：</p>
          <Input type="Name" placeholder="Name" />
          
          <p>Cellphone：</p>
          <Input maxLength={10} placeholder="Cellphone" />
          
          <p>Identity：</p>
          <Input maxLength={10} placeholder="Identity" />
        
        </div>
      ))}
      
    </CardContent>

    <CardFooter className="flex justify-center space-x-24">
      
      <Button variant="default" onClick={handleBackClick}>
        Cancle
      </Button>

      <Button variant="default" asChild onClick={handleCreateTicket}>
        <Link href="">
          Next
        </Link>
      </Button>

    </CardFooter>

    </Card>
  );
}

export default TicketUserStep2Page;