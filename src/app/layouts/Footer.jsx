import React from 'react'

export default function Footer() {
  return (
    <>
    <div className='bg-gray-500 h-32 px-4 justify-center border-solid	border border-gray-500 grid'>
        <div className='h-16 flex items-center'>
          image
        </div>
        <hr></hr>
        <div className='bg-grat-500 h-16 flex items-center gap-10'>
            <div>聯絡電話：02-2778-1570</div>
            <div>電子郵件：service@farentasia.com</div>
            <div>服務時間週一至週五 10:00 - 18:00 (國定假日除外)</div>
        </div>
    </div>
    </>
  )
}
