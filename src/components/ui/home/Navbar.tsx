import React, { FC } from 'react';
import { IoMdSearch } from "icons-react/io";
import Link from 'next/link';
import Image from 'next/image';
import LoginButton from '../../Login/LoginButton';

const Header: FC = () => {
    return (
        <header>
            <div className='bg-gray-500 h-16 px-4 flex justify-center border-double border border-gray-500 '>
                <div className='bg-gray-500 h-16 px-4 flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 space-x-0 md:space-x-4 items-center'>
                    <div>
                        <Link href="/">
                            <Image
                                src="/images/activity_img/boat.jpg"
                                alt="BS_Logo"
                                width={100}
                                height={100}
                                priority={true}
                            />
                        </Link>
                    </div>
                    <ul className='flex justify-between space-x-4 items-center'>
                        <li> <Link href="/Activity">活動分類</Link> </li>
                        <li> <Link href="/News">最新公告</Link> </li>
                        <li> <Link href="/FAQ">常見問題</Link> </li>
                        <li> <Link href="/About">關於我們</Link> </li>
                    </ul>
                    <div className='relative'>
                        <IoMdSearch fontSize={20} className='text-gray-400 absolute top-1/2 -translate-y-1/2 left-3'/>
                        <input type='text' 
                            placeholder='Search...' 
                            className='text-sm focus:outline-none active:outline-none h-10 w-32 border border-gray-300 rounded-sm pl-11 px-4'/> 
                    </div>
                    <div><LoginButton/></div>
                </div>
            </div>
        </header>
    )
}

export default Header;