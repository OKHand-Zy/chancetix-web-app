'use client';
import React, { FC, useState, useEffect } from 'react';
import { IoMdSearch } from "icons-react/io";
import Link from 'next/link';
import Image from 'next/image';
import { NavbarAccountButton } from '@/components/ui/home/NavbarAccountButton';
import { NavigationButton } from '@/components/ui/home/NavbarButtom';
import { NavbarSearch } from '@/components/ui/home/NavbarSearch';
import { NavbarSidebar } from '@/components/ui/home/NavbarSidebar';

interface HeaderProps {
    // define props here if needed
}

const Header: FC<HeaderProps> = () => {
  const [isMobileView, setIsMobileView] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768); // 假設 768px 為移動端閾值
    };  
    window.addEventListener('resize', handleResize);
    handleResize(); // 初始化檢查視窗大小
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header>
      <div className='
        bg-white
        h-20 
        px-4 
        flex 
        justify-center 
        border-b-4
        border-gray-300 
      '>
        <div className='h-16 px-4 flex justify-between items-center w-full'>
          <div className='flex items-center'>
            <Link href="/">
              <Image
                src="/images/chancetix.png"
                alt="BS_Logo"
                width={90}
                height={90}
                priority={true}
              />
            </Link>
          </div>
            {!isMobileView && (
              <>
                <NavigationButton />
                <div className='relative'>
                  <IoMdSearch fontSize={20} className='text-gray-400 absolute top-1/2 -translate-y-1/2 left-3'/>
                  <NavbarSearch />
                </div>
                <NavbarAccountButton />
              </>
            )}
            {isMobileView && (
              <div className='md:hidden justify-end '>
                <NavbarSidebar />
              </div>
            )}
        </div>
      </div>
    </header>
  );
};
  
export default Header;