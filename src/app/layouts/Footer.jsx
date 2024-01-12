import React from 'react'

export default function Footer() {
  return (
    <>
    <div className='bg-gray-500 h-16 px-4 flex justify-between border-solid	border border-gray-500'>
        <div className="flex justify-start items-center gap-2 mr-2">
            <div>image</div>
            <div>name</div>
        </div>
        <div className='bg-grat-500 h-16 flex justify-end items-center'>
            <div>list1</div>
            <div>/</div>
            <div>list2</div>
            <div>/</div>
            <div>list3</div>
        </div>
        <div className='bg-grat-500 h-16 px-4 flex justify-end items-center'>
            <div>account</div>
        </div>
    </div>
    </>
  )
}
