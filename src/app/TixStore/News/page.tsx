import React from 'react'
import Link from 'next/link'
import ErrorBoundary from './error'

import { Button } from '@/components/ui/Shadcn/button'
import { Card } from '@/components/ui/Shadcn/card'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/Shadcn/accordion';

export default function page() {
  return (
    <ErrorBoundary>
      <div  className='h-screen flex justify-center p-8'>
        <Card className='w-9/12'>
          <div className="
            flex flex-col 
            items-center justify-center 
            text-center p-10 ">
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                最新消息
              </h1>
              <Accordion type="single" className="w-8/12 p-10">
                <AccordionItem value="Quiz1">
                  <AccordionTrigger>為何延期?</AccordionTrigger>
                  <AccordionContent>
                    <p>因本人只有單人開發關係加上開發經驗少導致進度緩慢, 近期會去 g0v 尋找有意願人力來一起開發盡快完成!!</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
          </div>
          <div className='flex justify-center p-10'>
            <Button asChild>
              <Link href="/">Back Home</Link>
            </Button>
          </div>
        </Card>
      </div>
    </ErrorBoundary>
  )
}
