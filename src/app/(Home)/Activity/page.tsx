import React from 'react'
import Link from 'next/link'
import ErrorBoundary from './error'

export default function page() {
  return (
    <ErrorBoundary>
    <div  className='h-full'>
      
      <div>
        Activity
      </div>
      <div>
          <Link href="/">back</Link>
      </div>

    </div>
    </ErrorBoundary>
  )
}
