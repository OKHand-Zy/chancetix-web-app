import React from 'react'
import { IoMdSearch } from "icons-react/io";
import Link from 'next/link';

export default function Header() {
  return (
    <>
    <div className='bg-gray-500 h-16 px-4 flex justify-between border-double border border-gray-500'>
        <div className="flex justify-start items-center gap-2 mr-2">
            <div>image</div>
            <div className='relative'>
                <IoMdSearch fontSize={20} className='text-gray-400 absolute top-1/2 -translate-y-1/2 left-3'/>
                <input type='text' 
                    placeholder='Search....' 
                    className='text-sm focus:outline-none active:outline-none h-10 w-[16rem] border border-gray-300 rounded-sm pl-11 px-4'/> 
            </div>
        </div>

        <div className='bg-grat-500 h-16 flex justify-end items-center '>
            <div>
                <Link href="/About">About</Link>
            </div>
            <div>/</div>
            <div>list2</div>
            <div>/</div>
            <div>list3</div>
        </div>
        
        <div className='bg-grat-500 h-16 px-4 flex justify-end items-center '>
            <div>account</div>
        </div>
        
    </div>
    </>
  )
}
