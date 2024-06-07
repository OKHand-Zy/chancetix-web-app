"use client";
import { SellFrom } from "./_components/sell-from";

function Activity_2_Normal() {

  const volunteerList: { label: string; value: string; }[] = [
    { label: "Tier1", value: "Normal1" },
    { label: "Tier2", value: "Normal2" },
    { label: "Tier3", value: "Normal3" }  
  ];

  return (
    <div className="flex justify-center">
      <SellFrom 
        activityName="Activity_2" 
        ticketType="Normal"
        NavBarDescription = "Lottery Mode Ticket" 
        volunteerList = {volunteerList}
      />
    </div>
  );
}

export default Activity_2_Normal;