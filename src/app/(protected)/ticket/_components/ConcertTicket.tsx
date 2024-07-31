import React from 'react';

const ConcertTicket: React.FC = () => {
  return (
    <div className="w-[800px] h-[300px] bg-gradient-to-br from-[#a8edea] to-[#fed6e3] rounded-[15px] flex overflow-hidden font-sans shadow-lg">
      <div className="flex-1 p-5 flex flex-col">
        <div className="flex justify-between text-xs text-gray-700">
          <span>Music Festival Celebrations</span>
          <span>123 Anywhere St., Any City</span>
        </div>
        <h1 className="text-5xl font-bold mt-5 mb-0">Music Concert</h1>
        <h2 className="text-4xl font-bold m-0">2028</h2>
        <div className="mt-auto text-sm">
          <p>For more information, you can visit our website with the link down below</p>
          <p>November 15TH, 2028 | 2 PM</p>
        </div>
        <div className="mt-2.5 text-sm">www.reallygreatsite.com</div>
      </div>
      <div className="w-[150px] bg-white flex items-center justify-center border-l-2 border-dashed border-gray-700">
        <div className="w-[120px] h-[200px] bg-[repeating-linear-gradient(to_right,#000,#000_2px,#fff_2px,#fff_4px)]"></div>
      </div>
    </div>
  );
};

export default ConcertTicket;