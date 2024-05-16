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

import LTicketFromStore from '@/store/LTicketFromStore'

interface SellFromProps {
  activityName: string;
  ticketType: string;
  NavBarTitle?: string;
  NavBarDescription : string;
  volunteerList : { label: string, value: string }[];
}

export const SellFrom: React.FC<SellFromProps> = ({ 
  activityName,
  ticketType,
  NavBarTitle = activityName+"-"+ticketType,
  NavBarDescription, 
  volunteerList 
}) => {

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  function AlertDTitle () {
    const FVolunteer = LTicketFromStore((state) => state.FVolunteer)
    const FVCount = LTicketFromStore((state) => state.FVCount)
    const SVolunteer = LTicketFromStore((state) => state.SVolunteer)
    const SVCount = LTicketFromStore((state) => state.SVCount)
    if ( FVolunteer === "" || SVolunteer === "" ||
        FVCount <= 0 || SVCount <= 0) 
      {
        return (
          <AlertDialogTitle>
            Confirm your selection of volunteers
          </AlertDialogTitle>
        )
      } else {
        return (
          <AlertDialogTitle>
            Confirm your selection of volunteers
          </AlertDialogTitle>
        )
      }
  }

  function AlertMessage() {
    const FVolunteer = LTicketFromStore((state) => state.FVolunteer)
    const FVCount = LTicketFromStore((state) => state.FVCount)
    const SVolunteer = LTicketFromStore((state) => state.SVolunteer)
    const SVCount = LTicketFromStore((state) => state.SVCount)
    if (FVolunteer == "" || SVolunteer == "" )
    <div className='flex flex-col gap-y-2'>
      {(LTicketFromStore((state) => state.FVolunteer) === "" || LTicketFromStore((state) => state.SVolunteer) === "") 
        ? <p className='text-red-500'>Select both Volunteers.</p> 
        : (LTicketFromStore((state) => state.FVCount) <= 0 || LTicketFromStore((state) => state.SVCount) <= 0)
        ? <p className='text-red-500'>Check both TicketCount must &gt; 0</p> 
        : <>
          <p>
            First  Volunteer: {getFromInfo().FVolunteer} 
            TicketCount: {getFromInfo().FVCount}
          </p>  
          <p>
            Second Volunteer: {getFromInfo().SVolunteer}
            TicketCount: {getFromInfo().SVCount}
          </p> 
          </>
      }
    </div>
  }

  function updateStoreInfo() {
    LTicketFromStore.getState().UpdateACName(activityName);
    LTicketFromStore.getState().UpdateTicketType(ticketType);
  }

  useEffect(() => {
    updateStoreInfo()
  }, []);

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
              VType="FV"
            />
            <CountButton 
              VType = "FV"
            />
          </div>

          <div className='w-1/2 flex justify-between items-center'>
            <VoluteerCombobox 
              fromLabel = "Second Volunteer："
              formDescrip = "Please select your second volunteer"
              volunteerList={volunteerList} 
              VType="SV"
            />
            <CountButton 
              VType = "SV"
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
                <AlertDTitle />
                <AlertMessage />
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={handleCloseDialog}>
                  Cancel
                </AlertDialogCancel>

                {(getFromInfo().FVolunteer === "" || getFromInfo().SVolunteer === "" ||
                  getFromInfo().FVCount <= 0 || getFromInfo().SVCount <= 0) 
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