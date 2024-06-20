'use client';
import { useEffect, useState } from "react";
import { SellFrom } from "./_components/sell-from";
import { usePathname } from 'next/navigation'

function Activity_1_Normal() {
  const pathname = usePathname(); 
  const [eventName, setEventName] = useState("unknown");
  const [ticketType, setTicketType] = useState("unknown");

  useEffect(() => {
    const regex = /\/sellticket\/([^\/]+)\/([^\/]+)/;
    const pathMatch = pathname.match(regex);
    if (pathMatch && pathMatch.length >= 3) {
      setEventName(pathMatch[1]);
      setTicketType(pathMatch[2]);
    }
  }, [pathname]);
  
  return (
    <div className="flex justify-center">
      <SellFrom activityName={eventName} ticketType={ticketType} ticketGroup="standard"/>
    </div>
  );
}

export default Activity_1_Normal;