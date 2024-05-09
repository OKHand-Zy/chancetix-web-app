"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Shadcn/button';
import {
  Card,
  CardDescription,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Shadcn/card"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/Shadcn/alert-dialog"

import { SellFromNavbar } from './sell-from-Navbar';
import VoluteerCombobox from './voluteer-combobox';
import CountButton from './count-button';

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const session_user = useCurrentUser();

  const [N1Count, setN1Count] = useState<number>(0);
  const [N1Volunteer, setN1Volunteer] = useState<string>("");

  const [N2Count, setN2Count] = useState<number>(0);
  const [N2Volunteer, setN2Volunteer] = useState<string>("");
  
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <Card className="w-8/12">
        
        <CardHeader className="text-center">
          <SellFromNavbar 
            title={NavBarTitle} 
            description={NavBarDescription} 
          /> 
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-y-4">
          <div className='w-1/2 flex justify-between items-center'>
            <VoluteerCombobox 
              fromLabel = "First Volunteer："
              formDescrip = "Please select your first volunteer"
              volunteerList={volunteerList} 
              onValueChange={(CVolunteer: string) => {
                setN1Volunteer(CVolunteer);
                console.log("FV : " + CVolunteer);
              }} // 使用 onValueChange 回调函数
            />
            <CountButton 
              onCountChange={(newCount) => {
                setN1Count(newCount);
                console.log("Normal-1 : " + newCount);
              }}
              status={N1Volunteer !== "" ? true : false}
            />
          </div>
          <div className='w-1/2 flex justify-between items-center'>
            <VoluteerCombobox 
              fromLabel = "Second Volunteer："
              formDescrip = "Please select your second volunteer"
              volunteerList={volunteerList} 
              onValueChange={(CVolunteer: string) => {
                setN2Volunteer(CVolunteer);
                console.log("FV : " + CVolunteer);
              }} // 使用 onValueChange 回调函数} // 使用 onValueChange 回调函数
            />
            <CountButton 
              onCountChange={(newCount) => {
                setN2Count(newCount);
                console.log("Normal-2 : " + newCount);
              }}
              status={N2Volunteer !== "" ? true : false}
            />
          </div>
        </CardContent>

        <CardFooter className='lex justify-center items-center'>
          <AlertDialog >
            <AlertDialogTrigger asChild>
              <Button> Submit </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {(N1Volunteer === "" || N2Volunteer === "" || N1Count <= 0 || N2Count <= 0) 
                    ? "Please Check Volunteers & TicketCount " 
                    : "Confirm your selection of volunteers"
                  }
                </AlertDialogTitle>
                <div className='flex flex-col gap-y-2'>
                  {(N1Volunteer === "" || N2Volunteer === "") 
                    ? <p className='text-red-500'>Select both Volunteers.</p> 
                    : (N1Count <= 0 || N2Count <= 0)
                    ? <p className='text-red-500'>Check both TicketCount must &gt; 0</p> 
                    : <>
                      <p>First  Volunteer: {N1Volunteer}  TicketCount: {N1Count}</p>  
                      <p>Second Volunteer: {N2Volunteer}  TicketCount: {N2Count}</p> 
                      </>
                  }
                </div>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={handleCloseDialog}>
                  Cancel
                </AlertDialogCancel>

                {(N1Volunteer === "" || N2Volunteer === "" || N1Count <= 0 || N2Count <= 0) 
                  ? <></>
                  : <Button asChild>
                      <Link href={'/subscrbe-from'}>Continue</Link>
                    </Button>
                }  

              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
        
      </Card>
    </div>
  )
};