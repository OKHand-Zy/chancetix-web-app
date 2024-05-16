import { SellFrom } from "./_components/sell-from";

function Activity_2_Normal() {
  
  const volunteerList: { label: string; value: string; }[] = [
    { label: "English", value: "en" },
    { label: "French", value: "fr" },
    { label: "German", value: "de" },
    { label: "Spanish", value: "es" },
    { label: "Portuguese", value: "pt" },
    { label: "Russian", value: "ru" },
    { label: "Japanese", value: "ja" },
    { label: "Korean", value: "ko" },
    { label: "Chinese", value: "zh" },
  ];

  return (
    <div className="flex justify-center">
      <SellFrom 
        NavBarDescription = "Lottery Mode Ticket"
        activityName="ABC" 
        ticketType="Normal" 
        volunteerList = {volunteerList}
      />
    </div>
  );
}

export default Activity_2_Normal;