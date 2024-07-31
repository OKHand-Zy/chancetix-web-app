import React from 'react'
import Link from 'next/link'
import ErrorBoundary from './error'

import { Button } from '@/components/ui/Shadcn/button'
import { Card } from '@/components/ui/Shadcn/card'

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
                活動
              </h1>
              <p className="leading-7 [&:not(:first-child)]:mt-6">
                目前無售票活動....
              </p>
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
