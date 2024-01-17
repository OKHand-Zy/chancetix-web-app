import React from 'react'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer>
      <div className='bg-gray-500 h-32 px-4 justify-center border-solid	border border-gray-500 grid'>
          <div className='h-16 flex items-center'>
            <Image 
                        src="/images/activity_img/boat.jpg"
                        alt="BS_Logo"
                        width={100}
                        height={100}
                        priority={true}
            />
          </div>
          <hr></hr>
          <div className='bg-grat-500 h-16 justify-center'>
            <div className='flex items-center gap-10'>
                <p>聯絡電話：02-2778-1570</p>
                <p>電子郵件：service@farentasia.com</p>
                <p>服務時間週一至週五 10:00 - 18:00 (國定假日除外)</p>
            </div>
            <p className='flex justify-center items-center gap-10'>© 2023 XXX網，版權所有。</p>
          </div>
          
      </div>
    </footer>
  )
}
