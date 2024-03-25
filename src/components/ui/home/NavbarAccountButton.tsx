"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/Shadcn/button"

export const NavbarAccountButton = () => {
  return (
    <div className="flex gap-x-2">
      <Button asChild variant="ghost">
        <Link href="/auth/login">Login</Link>
      </Button>
      <Button asChild variant="ghost">
        <Link href="/auth/register">Register</Link>
      </Button>
    </div>
  )
}
