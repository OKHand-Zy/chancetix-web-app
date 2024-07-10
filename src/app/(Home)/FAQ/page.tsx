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
                常見問題
              </h1>
              <Accordion type="multiple" className="w-8/12 p-10">
                <AccordionItem value="Quiz1">
                  <AccordionTrigger>如何聯繫我們?</AccordionTrigger>
                  <AccordionContent>ChanceTix.service@gmail.com</AccordionContent>
                </AccordionItem>

                <AccordionItem value="Quiz2">
                  <AccordionTrigger>服務何時上線?</AccordionTrigger>
                  <AccordionContent>
                    <p>
                    <del>預計2024年6月底上線</del>
                    <br/>
                    延期至2024年底
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="Quiz3">
                  <AccordionTrigger>製作人?</AccordionTrigger>
                  <AccordionContent>OKH@nd.ZY</AccordionContent>
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
