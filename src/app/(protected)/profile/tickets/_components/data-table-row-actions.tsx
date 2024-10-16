"use client"
import React, { useState, ReactNode } from "react";
import { useCookies } from 'next-client-cookies';
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"
import { Button } from "@/components/ui/Shadcn/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/Shadcn/dropdown-menu"

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

import {change2SwitchTicket} from "@/action/profile-ticket/ticket2switch"

interface TicketDataProps {
  ticketData: {
    serialNumber: string,
    userName: string,
    userEmail: string,
    eventname: string,
    ticketType: string,
    ticketGroup: string,
    position: string,
    price: number,
    status: string,
  };
}

type DialogConfig = {
  title: string;
  content: ReactNode;
  onContinue: () => void;
};

export const TicketCardOptions = ({ ticketData }: TicketDataProps) => {
  const session = useSession()
  const cookies = useCookies()
  const router = useRouter()
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogConfig, setDialogConfig] = useState<DialogConfig | null>(null);
  
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleOpenDialog = (config: DialogConfig) => {
    setDialogConfig(config);
    setIsDialogOpen(true);
  };

  const handleContinueDialog = () => {
    dialogConfig?.onContinue();
    setIsDialogOpen(false);
  };

  const handleTransferTicket = () => {
    cookies.set('ticketSN', ticketData.serialNumber)
    cookies.set('userEmail', ticketData.userEmail)
    cookies.set('userName', ticketData.userName)
    router.push('/ticket/transfer');
  };

  const transferDialogConfig: DialogConfig = {
    title: "Transfer",
    content: <p>Do you want to transfer this ticket?</p>,
    onContinue: handleTransferTicket,
  };

  const handleSellTicket = async () => {
    const userId = session.data?.user?.id;
    const ticketSN = ticketData.serialNumber;
    if (userId && ticketSN) {
      const result = await change2SwitchTicket({ userId, ticketSN });
      if (!result.error) {
        window.location.reload() // 反轉刷新狀態以觸發重新渲染
      } else {
        console.error(result.error);
      }
    } else {
      console.error("Missing userId or ticketSN");
    }
  };

  const sellDialogConfig: DialogConfig = {
    title: "Sell",
    content: <p>Do you want to sell this ticket to SwitchTix?</p>,
    onContinue: handleSellTicket,
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onClick={() => handleOpenDialog(transferDialogConfig)}>
            Transfer to Other
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => handleOpenDialog(sellDialogConfig)}>
            Sell to SwitchTix
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          
          <AlertDialogHeader>
            <AlertDialogTitle>{dialogConfig?.title}</AlertDialogTitle>
            <div className="flex flex-col gap-y-2">{dialogConfig?.content}</div>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCloseDialog}>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button onClick={handleContinueDialog}>Continue</Button>
            </AlertDialogAction>
          </AlertDialogFooter>

        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};