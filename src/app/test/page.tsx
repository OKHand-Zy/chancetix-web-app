"use client";
import { db } from "@/lib/db"
import { Metadata } from "next"
import Image from "next/image"
import { z } from "zod"

import { 
  Card,
  CardContent
} from "@/components/ui/Shadcn/card"

import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import HashLoader from "react-spinners/HashLoader";
import { Button } from "@/components/ui/Shadcn/button";
import { useRouter } from 'next/navigation';

import ConcertTicket from "./_components/ConcertTicket";

export default function TestPage() {
  const router = useRouter();
  
  const handleClick = () => {
    router.refresh(); 
    //window.location.reload() // 頁面重新整理

  }
  
  return (
    <div className="App">
      <ConcertTicket />
    </div>
  )
}
