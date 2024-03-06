import React, { FC } from 'react';
import { IoMdSearch } from "icons-react/io";
import Link from 'next/link';
import Image from 'next/image';
import { NavigationAccountButton } from '@/components/ui/home/NavbarAccountButton';
import { NavigationButton } from '@/components/ui/home/NavbarButtom';
import { NavbarSearch } from '@/components/ui/home/NavbarInput';
interface HeaderProps {
    // define props here if needed
}

const Header: React.FC<HeaderProps> = () => {
    return (
        <header>
            <div className='bg-gray-500 h-16 px-4 flex justify-center border-double border border-gray-500 '>
                <div className='h-16 px-4 flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 space-x-0 md:space-x-4 items-center'>
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
                    <NavigationButton />
                    <div className='relative'>
                        <IoMdSearch fontSize={20} className='text-gray-400 absolute top-1/2 -translate-y-1/2 left-3'/>
                        <NavbarSearch />
                    </div>
                    <div>
                        <NavigationAccountButton />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;