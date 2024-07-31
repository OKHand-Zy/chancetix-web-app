"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Shadcn/card";
import { useRouter } from 'next/navigation';

import { Button } from "@/components/ui/Shadcn/button";
import Link from "next/link";

import LTicketFromStore from '@/store/LTicketFromStore'


function TicketUserStep1Page() {
  // zustand 訂閱值 保持在最新的狀態
  const { FVolunteer, SVolunteer, FVCount, SVCount, ACName } = LTicketFromStore((state) => ({
    ACName: state.activityName,
    FVolunteer: state.FVolunteer,
    FVCount: state.FVCount,
    SVolunteer: state.SVolunteer,
    SVCount: state.SVCount,
  }));

  const router = useRouter();
  const handleBackClick = () => { 
    LTicketFromStore.getState().resetTicketData()
    LTicketFromStore.persist.clearStorage()
    router.push(`/Activity/info/${ACName}`);
  };

  return (
      <Card className="w-full text-center">
        
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            🎫 Tickets Info
          </CardTitle>
          <CardDescription className=""> 
            Checking you choose tickets
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <h1> Volunteer 1：{FVolunteer} </h1>
          <h1> Ticket Count：{FVCount} </h1>
          <hr/>
          <h1>Volunteer 2：{SVolunteer} </h1>
          <h1>Ticket Count：{SVCount}</h1> 
        </CardContent>

        <CardFooter className="flex justify-center space-x-24">
          
          <Button variant="default" onClick={handleBackClick}>
            Back
          </Button>

          <Button variant="default" asChild>
            <Link href="/Activity/result/lottery-ticket/step2">Next</Link>
          </Button>

        </CardFooter>

      </Card>
  );
}

export default TicketUserStep1Page;