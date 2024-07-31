import React from 'react';
import Image from 'next/image';

const Footer: React.FC = () => {
  // 創建一個 Date 物件
  const date = new Date();
  // 使用 Intl.DateTimeFormat 來格式化日期，並指定時區為 'Asia/Shanghai'（UTC+8 時區）
  const formatter = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Taipei', year: 'numeric' });
  // 使用 format 方法來獲取格式化後的年份
  const year = formatter.format(date);
  return (
    <footer>
      <div className='
        bg-slate-400
        h-40 
        px-4 
        justify-center 
        border-t-4
        border-gray-700 
        grid 
        grid-cols-1
      '>
          <div className='flex items-center justify-center space-x-4'>
            <Image 
              src="/images/chancetix.png"
              alt="BS_Logo"
              width={150}
              height={150}
              priority={true}
            />
            <div className='flex items-center space-y-1 flex-col'>
              <p>聯絡電話：02-xxxx-xxxx</p>
              <p>電子郵件：service@chancetix.com</p>
              <p>服務時間週一至週五 10:00 - 18:00 (國定假日除外)</p>
            </div>
          </div>
          <hr></hr>
          <div className='justify-center flex flex-col items-center'>
            <p className='flex justify-center items-center gap-10'>© {year} ChanceTix，版權所有。</p>
          </div>
      </div>
    </footer>
  );
}

export default Footer;