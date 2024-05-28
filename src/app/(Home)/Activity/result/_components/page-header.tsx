"use client";

import { Button } from "@/components/ui/Shadcn/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";

export const Navbar = () => {
  const pathname = usePathname();
  return (
      <div className="w-full bg-white p-4 rounded-xl shadow-sm flex gap-x-4
                      flex justify-center items-center">
        <div 
          className={pathname.endsWith("/step1") 
            ? "text-black" 
            : "text-gray-300"
          }
        >
          <p> Step1. </p>
          <p> Check Ticket Info </p>
        </div>
        
        <div className="p-4">
          <FaArrowRight />
        </div>

        <div 
          className={pathname.endsWith("/step2") 
          ? "text-black" 
          : "text-gray-300"
          }
        >
          <p>Step2.</p>
          <p> Check customer Info</p>
        </div>
        
        <div className="p-4">
          <FaArrowRight />
        </div>

        <div 
          className={pathname.endsWith("/step3") 
            ? "text-black" 
            : "text-gray-300"
          }
        >
          <p>Step3.</p>
          <p> Complete! </p>
        </div>
      </div>

  );
}