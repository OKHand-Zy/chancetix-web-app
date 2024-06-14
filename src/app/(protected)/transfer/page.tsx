"use client";

import { useCookies } from 'next-client-cookies';
import { useState } from 'react';
import Link from "next/link";
import { 
  Card, 
  CardHeader,
  CardContent, 
  CardFooter,
} from "@/components/ui/Shadcn/card";
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Shadcn/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {Button} from "@/components/ui/Shadcn/button";
import { Input } from '@/components/ui/Shadcn/input';

import { transferTicket } from "@/action/profile-ticket/trasfer2other";

const TransferPage = () => {  
  const cookies = useCookies()
  
  const ticketSN : string = cookies.get('ticketSN') || ""
  const userName : string = cookies.get('userName') || ""
  const userEmail : string = cookies.get('userEmail') || ""


  const FormSchema = z.object({
    HolderEmail: z.string().min(2, {
      message: "HolderName must be at least 2 characters.",
    }),
    TicketSN: z.string().min(2, {
      message: "TicketSN must be at least 2 characters.",
    }),
    TransferEmail: z.string().min(2, {
      message: "TransferEmail must be at least 2 characters.",
    }),
    TransferName: z.string().min(2, {
      message: "TransferName must be at least 2 characters.",
    }),
  })
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      HolderEmail: userEmail,
      TicketSN: ticketSN,
      TransferEmail: "",
      TransferName: "",
    },
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      // action transfer ticket
      const response = await transferTicket({
        holderName: userName,
        holderEmail: data.HolderEmail,
        ticketSN: data.TicketSN,
        transferEmail: data.TransferEmail,
        transferName: data.TransferName,
      });

      if (response.success) {
        setDialogMessage('Transfer ticket success!');
      } else {
        setDialogMessage('Transfer ticket failed!');
      }
      setIsDialogOpen(true);

      cookies.remove('userName');
      cookies.remove('userEmail');
      cookies.remove('ticketSN');
    } catch (error) {
      setDialogMessage('An error occurred during the transfer!');
      setIsDialogOpen(true);
    }
  };

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          🎫 Tarnsfer Ticket
        </p>
      </CardHeader>
      <CardContent className="space-y-4 grid items-center gap-1.5">
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="HolderEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>持有者信箱:</FormLabel>
                  <FormControl>
                    <Input disabled type="email" placeholder="Holder Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="TicketSN"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>票卷識別碼:</FormLabel>
                  <FormControl>
                    <Input disabled placeholder="TicketSN" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="TransferEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>被贈與者信箱:</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Transfer Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="TransferName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>轉移後票卷使用者名:</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Transfer Customer Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className='flex w-full justify-center'>Transfer</Button>
          </form>
        </Form>
      </CardContent>
      
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          
          <AlertDialogHeader>
            <AlertDialogTitle>Transfer Status.</AlertDialogTitle>
            <AlertDialogDescription>
              {dialogMessage}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogAction asChild className='w-full'>
              <Link href="/tickets">OK</Link>
            </AlertDialogAction>
          </AlertDialogFooter>

        </AlertDialogContent>
      </AlertDialog>

    </Card>
  )
}
export default TransferPage;