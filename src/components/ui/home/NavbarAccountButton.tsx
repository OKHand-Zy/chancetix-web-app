"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/Shadcn/button"

import { useCurrentUser } from "@/hooks/use-current-user";
import { logout } from "@/action/logout"

export const NavbarAccountButton = () => {
  const session_user = useCurrentUser();

  return (
    <>
      {!session_user ? (
        <div className="flex gap-x-2">
          <Button asChild variant="ghost">
            <Link href="/auth/login">Login</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/auth/register">Register</Link>
          </Button>
        </div>
      ) : (
        <div className="flex gap-x-2">
          <p>Hi~ {session_user?.name}</p>
          <Button onClick={() => logout()} variant="ghost">
            Logout
          </Button>
        </div>
      )}
    </>
  );
};
