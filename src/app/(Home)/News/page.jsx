import React from 'react'
import Link from 'next/link'
import {ErrorBoundary} from 'react-error-boundary'
import Error from './error'

export default function page() {
    return (
      <div className=''>
      <ErrorBoundary FallbackComponent={<Error/>}>
      
        <h1 className='text-2xl'>News</h1>
        <hr/>
        <div>
            <Link href="/">back</Link>
        </div>
      
      </ErrorBoundary>
      </div>
    )
}
