"use client"

import React, { useState, useEffect } from 'react';

import Link from 'next/link';
import { Button } from '@/components/ui/Shadcn/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Shadcn/card"

import SellTicketLen from "./sellticket_len";

export const SellFrom = () => {
  const [vip1Count, setVip1Count] = useState<number>(0);
  const [vip2Count, setVip2Count] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  
  useEffect(() => {
    setTotalCount(vip1Count + vip2Count);
  }, [vip1Count, vip2Count]);

  const handleShowTotalCount = () => {
    // 處理顯示總數量的邏輯 , 後來改成查詢資料庫確認有之後再觸發購買,沒有回傳 alert 沒有庫存
    alert(`VIP-1: ${vip1Count}, VIP-2: ${vip2Count}, Total: ${totalCount}`);
  };

  return (
    <div className="bg-white w-8/12 p-10 rounded-xl flex justify-center">
      <Card className="w-8/12">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl">404</CardTitle>
          <CardDescription>
            The page you’re looking for doesn’t exist.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-center flex-col">
          <SellTicketLen
              label="VIP-1"
              onCountChange={(newCount) => {
                setVip1Count(newCount);
                console.log("VIP-1 : " + newCount);
              }}
            />
            <SellTicketLen
              label="VIP-2"
              onCountChange={(newCount) => {
                setVip2Count(newCount);
                console.log("VIP-2 : " + newCount);
              }}
            />
            
        </CardFooter>
        <div className='flex justify-center'>
          <Button onClick={handleShowTotalCount}>
              Show Total Count
          </Button>
        </div>
      </Card>
    </div>
  )
}

