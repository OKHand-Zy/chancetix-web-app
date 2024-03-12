import React from 'react';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer>
      <div className='bg-gray-500 h-40 px-4 justify-center border-solid border border-gray-500 grid grid-cols-1'>
          <div className='flex items-center justify-center space-x-4'>
            <Image 
              src="/images/chancetix.png"
              alt="BS_Logo"
              width={100}
              height={100}
              priority={true}
            />
            <div className='flex items-center space-y-1 flex-col'>
              <p>聯絡電話：02-2778-1570</p>
              <p>電子郵件：service@farentasia.com</p>
              <p>服務時間週一至週五 10:00 - 18:00 (國定假日除外)</p>
            </div>
          </div>
          <hr></hr>
          <div className='justify-center flex flex-col items-center'>
            <p className='flex justify-center items-center gap-10'>© 2023 XXX網，版權所有。</p>
          </div>
      </div>
    </footer>
  );
}

export default Footer;