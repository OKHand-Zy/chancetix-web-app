"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/Shadcn/button"

import { useCurrentUser } from "@/hooks/use-current-user";
import { logout } from "@/action/logout"
import LoginButton from '@/components/auth/login-button';
import RegisterButton from "@/components/auth/register-button";

export const NavbarAccountButton = () => {
  const session_user = useCurrentUser();

  return (
    <>
      {!session_user ? (
        <div className="flex gap-x-2">
          
          <LoginButton mode='modal' asChild>
            <Button variant="ghost">
              Sign in
            </Button>
          </LoginButton>

          <RegisterButton mode='modal' asChild>
            <Button variant="ghost">
              Register
            </Button>
          </RegisterButton>

        </div>
      ) : (
        <div className="flex gap-x-2 items-center">
          <p>Hi~ {session_user?.name}</p>
          <Button onClick={() => logout()} variant="ghost">
            Logout
          </Button>
        </div>
      )}
    </>
  );
};
