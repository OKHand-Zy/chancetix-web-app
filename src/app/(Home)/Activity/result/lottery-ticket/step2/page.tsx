"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Shadcn/card";
import { Button } from "@/components/ui/Shadcn/button";
import { Input } from "@/components/ui/Shadcn/input";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import {ResultDataCheck} from '@/action/lottery-ticket/result-check'

import LTicketFromStore from '@/store/LTicketFromStore'

function TicketUserStep2Page() {
  const router = useRouter();
  
  const { FVolunteer, SVolunteer, FVCount, SVCount, ACName, ticketType } = LTicketFromStore((state) => ({
    ACName: state.activityName,
    ticketType: state.ticketType,
    FVolunteer: state.FVolunteer,
    FVCount: state.FVCount,
    SVolunteer: state.SVolunteer,
    SVCount: state.SVCount,
  }));
  
  const [volunteer1Data, setVolunteer1Data] = useState(Array(FVCount).fill({ 
    VType: '', name: '', cellphone: '', identity: '' 
  }));
  
  const [volunteer2Data, setVolunteer2Data] = useState(Array(SVCount).fill({ 
    VType: '', name: '', cellphone: '', identity: '' 
  }));

  const handleInputChange = (volunteerIndex: number, field: string, value: string, Volunteer: number) => {
    if (Volunteer === 1) {
      const updatedData = [...volunteer1Data];
      updatedData[volunteerIndex][field] = value;
      updatedData[volunteerIndex]['VType'] = FVolunteer;
      setVolunteer1Data(updatedData);
    } 
    if (Volunteer === 2) {
      const updatedData = [...volunteer2Data];
      updatedData[volunteerIndex][field] = value;
      updatedData[volunteerIndex]['VType'] = SVolunteer;
      setVolunteer2Data(updatedData);
    }
  };

  const handleBackClick = () => { 
    LTicketFromStore.getState().resetTicketData()
    LTicketFromStore.persist.clearStorage()
    router.push(`/Activity/info/${ACName}`);
  };

  const handleCreateTicket = async () => {
    const allUserData = [...volunteer1Data.map(volunteer => ({
      volunteerType: volunteer.VType,
      customerName: volunteer.name,
      customerCellphone: volunteer.cellphone,
      customerIdentity: volunteer.identity,
    })), ...volunteer2Data.map(volunteer => ({
      volunteerType: volunteer.VType,
      customerName: volunteer.name,
      customerCellphone: volunteer.cellphone,
      customerIdentity: volunteer.identity,
    }))];
    const result = await ResultDataCheck({
      activityName: ACName,
      actype: ticketType,
      volunteerF: FVolunteer,
      vFCounts: FVCount,
      volunteerS: SVolunteer,
      vSCounts: SVCount
    },allUserData)
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
          <Input 
            type="Name" placeholder="Name" 
            value={volunteer1Data[index].name} 
            onChange={(e) => handleInputChange(index, 'name', e.target.value, 1)}/>
          
          <p>Cellphone：</p>
          <Input 
            maxLength={10} placeholder="Cellphone" 
            value={volunteer1Data[index].cellphone} 
            onChange={(e) => handleInputChange(index, 'cellphone', e.target.value, 1)}/>
          
          <p>Identity：</p>
          <Input 
            maxLength={10} placeholder="Identity" 
            value={volunteer1Data[index].identity} 
            onChange={(e) => handleInputChange(index, 'identity', e.target.value, 1)}/>
        </div>
      ))}
      
      <hr/>
      
      <p>Volunteer 2：{SVolunteer}</p>
      {Array.from({ length: SVCount }).map((_, index) => (
        <div key={index} className="flex flex-row items-center justify-around gap-x-4">
          
          <p>Name：</p>
          <Input 
            type="Name" placeholder="Name" 
            value={volunteer2Data[index].name} 
            onChange={(e) => handleInputChange(index, 'name', e.target.value, 2)}/>
          
          <p>Cellphone：</p>
          <Input 
            maxLength={10} placeholder="Cellphone" 
            value={volunteer2Data[index].cellphone} 
            onChange={(e) => handleInputChange(index, 'cellphone', e.target.value, 2)}/>
          
          <p>Identity：</p>
          <Input 
            maxLength={10} placeholder="Identity" 
            value={volunteer2Data[index].identity} 
            onChange={(e) => handleInputChange(index, 'identity', e.target.value, 2)}/>

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