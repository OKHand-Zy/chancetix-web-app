import React from 'react'
import Link from 'next/link'
import {ErrorBoundary} from 'react-error-boundary'
import Error from './error'

export default function page() {
  return (
    <div>
    <ErrorBoundary FallbackComponent={<Error/>}>
      
      <div>
        Activity
      </div>
      <div>
          <Link href="/">back</Link>
      </div>

    </ErrorBoundary>
    </div>
  )
}
