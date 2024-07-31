"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/Shadcn/card";

function TicketUserStep1Page() {
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          🎫 Tickets
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>Step1</div>
      </CardContent>
    </Card>
  );
}

export default TicketUserStep1Page;