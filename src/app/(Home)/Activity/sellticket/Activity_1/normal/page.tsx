'use client';
import { useEffect, useState } from "react";
import { SellFrom } from "./_components/sell-from";
import { usePathname } from 'next/navigation'

import { findTicketGroups } from "@/action/snap-up-ticket/f-tix-Groups";

import STicketFromStore from '@/store/STicketFromStore'

function Activity_1_Normal() {
  const pathname = usePathname(); 
  const [eventName, setEventName] = useState("unknown");
  const [ticketType, setTicketType] = useState("unknown");
  const [ticketGroup, setTicketGroup] = useState<string[] | null>(null);

  // zustand 訂閱值 保持在最新的狀態
  const {z_AcName, z_ticketType, z_tickets} = STicketFromStore((state) => ({
    z_AcName: state.activityName,
    z_ticketType: state.ticketType,
    z_tickets: state.tickets,
  }));

  function updateStoreInfo() {
    const STFstore = STicketFromStore.getState();
    STFstore.updateACName(eventName);
    STFstore.updateTicketType(ticketType);
  }

  function initStore() {
    STicketFromStore.getState().resetTicketData();
  }

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
          setTicketGroup(ticketGroups || null);
      }
      fetchTicketGroups();
      initStore()
      updateStoreInfo()
    }
    
  }, [eventName, ticketType]);



  useEffect(() => {
    const STFstore = STicketFromStore.getState();
    if (ticketGroup) {
      ticketGroup.forEach((group) => {
        STFstore.addGroup(group); 
      });
    }
  },[ticketGroup])

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