'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
} from '@/components/ui/Shadcn/card';

interface TicketCardProps {
  children: React.ReactNode;
  eventname: string;
}

export const TicketCard = ({
  children,
  eventname,
}: TicketCardProps) => {
  return (
    <Card className="
      bg-lime-300 
      text-center 
      w-full 
      shadow-md
    ">
      <CardTitle>
        {eventname}
      </CardTitle>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};
