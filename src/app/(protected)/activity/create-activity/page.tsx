"use client";

import { useState } from 'react';
import Link from "next/link";
import { cn } from "@/lib/utils";
import { format } from 'date-fns';
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/Shadcn/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Shadcn/popover";
import { Card, CardHeader, CardContent } from "@/components/ui/Shadcn/card";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/Shadcn/alert-dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Shadcn/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Shadcn/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/Shadcn/button";
import { Input } from '@/components/ui/Shadcn/input';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Shadcn/table"


// Define the form schema
const FormSchema = z.object({
  ActivityName: z.string().min(1, { message: "ActivityName must be at least 1 character." }),
  ActivityDate: z.date({ required_error: "A date of Activity is required." }),
  DateTime: z.string(),
  Location: z.string().min(1, { message: "Location must be at least 1 character." }),
  Capacity: z.string().min(0, { message: "Capacity must be greater than 0." }),
});

type FormValues = z.infer<typeof FormSchema>;

interface TicketType {
  type: string;
  group: string;
  price: string;
  capacity: string;
}

const CreateActivityPage: React.FC = () => {  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([]);
  const addTicketType = () => {
    setTicketTypes([...ticketTypes, { type: '', group: '', price: '', capacity: '' }]);
  };

  const removeTicketType = (index: number) => {
    setTicketTypes(ticketTypes.filter((_, i) => i !== index));
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ActivityName: "",
      ActivityDate: new Date(),
      DateTime: "00:00",
      Location: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log("Original form data:", data);
    // 組合日期和時間
    const [hours, minutes] = data.DateTime.split(':');
    const combinedDateTime = new Date(data.ActivityDate);
    combinedDateTime.setHours(parseInt(hours, 10), parseInt(minutes, 10));
    // 轉換為 ISO 字串
    const isoString = combinedDateTime.toISOString();
    console.log("ISO datetime:", isoString);
    
  };

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <h2 className="text-2xl font-semibold text-center">✨ Create Activity</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="ActivityName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>活動名稱:</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Activity Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex space-x-4">
              <FormField
                control={form.control}
                name="ActivityDate"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>活動日期:</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date() || date > new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="DateTime"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>活動時間:</FormLabel>
                    <div className="flex space-x-2">
                      <Select onValueChange={(hour) => field.onChange(`${hour}:${field.value?.split(':')[1] || '00'}`)}>
                        <FormControl>
                          <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="Hour" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {[...Array(24)].map((_, i) => (
                            <SelectItem key={i} value={i.toString().padStart(2, '0')}>
                              {i.toString().padStart(2, '0')}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <span className="self-center">:</span>
                      <Select onValueChange={(minute) => field.onChange(`${field.value?.split(':')[0] || '00'}:${minute}`)}>
                        <FormControl>
                          <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="Minute" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {[...Array(60)].map((_, i) => (
                            <SelectItem key={i} value={i.toString().padStart(2, '0')}>
                              {i.toString().padStart(2, '0')}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="Location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>活動地點:</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Activity Location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="button" onClick={addTicketType} className="w-full mb-2">
              Add Tickets Type & Group 
            </Button>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Group</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Capacity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ticketTypes.map((ticket, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeTicketType(index)}
                        className="h-8 w-8"
                      >
                        X
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Input
                        placeholder="Ticket Type"
                        value={ticket.type}
                        onChange={(e) => {
                          const newTicketTypes = [...ticketTypes];
                          newTicketTypes[index].type = e.target.value;
                          setTicketTypes(newTicketTypes);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        placeholder="Ticket Group"
                        value={ticket.group}
                        onChange={(e) => {
                          const newTicketTypes = [...ticketTypes];
                          newTicketTypes[index].group = e.target.value;
                          setTicketTypes(newTicketTypes);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        placeholder="Ticket Price"
                        type="number"
                        value={ticket.price}
                        onChange={(e) => {
                          const newTicketTypes = [...ticketTypes];
                          newTicketTypes[index].price = e.target.value;
                          setTicketTypes(newTicketTypes);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        placeholder="Ticket Capacity"
                        type="number"
                        value={ticket.capacity}
                        onChange={(e) => {
                          const newTicketTypes = [...ticketTypes];
                          newTicketTypes[index].capacity = e.target.value;
                          setTicketTypes(newTicketTypes);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={4}>Total Ticket Capacity：</TableCell>
                  <TableCell className="text-right">
                    {ticketTypes.reduce((sum, ticket) => sum + (parseInt(ticket.capacity) || 0), 0)} Tickets
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4}>Total Ticket Price：</TableCell>
                  <TableCell className="text-right">
                    NT$ {ticketTypes.reduce((sum, ticket) => {
                      const price = parseFloat(ticket.price) || 0;
                      const capacity = parseInt(ticket.capacity) || 0;
                      return sum + (price * capacity);
                    }, 0).toFixed(2)} TWD
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
            <Button type="submit" className="w-full">Activity Build!</Button>
          </form>

        </Form>
      </CardContent>
      
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Transfer Status</AlertDialogTitle>
            <AlertDialogDescription>{dialogMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction asChild className="w-full">
              <Link href="/profile/tickets">OK</Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
    </Card>
  );
};

export default CreateActivityPage;