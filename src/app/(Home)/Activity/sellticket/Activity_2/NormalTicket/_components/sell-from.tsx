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
  // zustand 訂閱值 保持在最新的狀態
  const { FVolunteer, SVolunteer, FVCount, SVCount } = LTicketFromStore((state) => ({
    FVolunteer: state.FVolunteer,
    FVCount: state.FVCount,
    SVolunteer: state.SVolunteer,
    SVCount: state.SVCount,
  }));

  function updateStoreInfo() {
    const LTFstore = LTicketFromStore.getState();
    LTFstore.UpdateACName(activityName);
    LTFstore.UpdateTicketType(ticketType);
  }

  function initStore() {
    LTicketFromStore.getState().resetTicketData();
  }

  useEffect(() => {
    initStore()
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
              formDescrip = "Select your first volunteer"
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
              formDescrip = "Select your second volunteer"
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
                <AlertDialogTitle>
                  {(FVolunteer === "" || SVolunteer === "" ||
                    FVCount <= 0 || SVCount <= 0) 
                    ? "Please Check Volunteers & TicketCount " 
                    : "Confirm your selection of volunteers"
                  }
                </AlertDialogTitle>
                <div className='flex flex-col gap-y-2'>
                  {(FVolunteer === "" || SVolunteer === "") 
                    ? <p className='text-red-500'>Select both Volunteers.</p> 
                    : (FVCount <= 0 || SVCount <= 0)
                    ? <p className='text-red-500'>Check both TicketCount must &gt; 0</p> 
                    : <>
                      <p>
                        First  Volunteer: {FVolunteer} <br />
                        TicketCount: {FVCount}
                      </p>  
                      <p>
                        Second Volunteer: {SVolunteer} <br />
                        TicketCount: {SVCount}
                      </p> 
                      </>
                  }
                </div>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={handleCloseDialog}>
                  Cancel
                </AlertDialogCancel>

                {(FVolunteer === "" || SVolunteer === "" ||
                  FVCount <= 0 || SVCount <= 0) 
                  ? <></>
                  : <Button asChild>
                      <Link href={'/Activity/result/lottery-ticket/step1'}>Continue</Link>
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