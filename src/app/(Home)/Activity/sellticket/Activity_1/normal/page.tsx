'use client';
import { useEffect, useState } from "react";
import { SellFrom } from "./_components/sell-from";
import { usePathname } from 'next/navigation'

import { findTicketGroups } from "@/action/snap-up-ticket/f-tix-Groups";

function Activity_1_Normal() {
  const pathname = usePathname(); 
  const [eventName, setEventName] = useState("unknown");
  const [ticketType, setTicketType] = useState("unknown");
  const [ticketGroup, setTicketGroup] = useState<string[] | null>(null);

  useEffect(() => {
    const regex = /\/sellticket\/([^\/]+)\/([^\/]+)/;
    const pathMatch = pathname.match(regex);
    if (pathMatch && pathMatch.length >= 3) {
      setEventName(pathMatch[1]);
      setTicketType(pathMatch[2]);
    }
  }, [pathname]);

  useEffect(() => {
    if (eventName !== "unknown" && ticketType !== "unknown") {
      const fetchTicketGroups = async () => {
          const ticketGroups = await findTicketGroups({eventName, ticketType});
          setTicketGroup(ticketGroups);
      }
      fetchTicketGroups();
    }
  }, [eventName, ticketType]);
  

  return (
    <div className="flex justify-center">
      { eventName === "unknown" && ticketType === "unknown" && ticketGroup === null
        ? <p>Unknown Event</p> 
        : <SellFrom activityName={eventName} ticketType={ticketType} ticketGroup={ticketGroup || []}/>
      }
    </div>
  );
}

export default Activity_1_Normal;