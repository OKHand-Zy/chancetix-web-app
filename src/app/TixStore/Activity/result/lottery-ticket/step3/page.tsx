"use client";

import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/Shadcn/card";
import {Button} from "@/components/ui/Shadcn/button";
import Link from "next/link";

function TicketUserStep3Page() {
  
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          🎫 Tickets
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">Good Luck!</div>
      </CardContent>
      <CardFooter>
        <Button
          className="flex items-center justify-center w-full" 
          variant="default" 
          asChild
        >
          <Link href="/">
            Back Home
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default TicketUserStep3Page;