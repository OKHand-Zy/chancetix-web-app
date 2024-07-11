"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/Shadcn/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/Shadcn/dropdown-menu"

import { useCurrentUser } from "@/hooks/use-current-user";
import { logout } from "@/action/logout"
import LoginButton from '@/components/auth/login-button';
import RegisterButton from "@/components/auth/register-button";

export const NavbarAccountButton = () => {
  const session_user = useCurrentUser();

  return (
    <>
      {!session_user 
      ? (
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
      ) 
      : (
        <div className="flex gap-x-2 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                Hi~ {session_user?.name}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              
              <DropdownMenuLabel>My Account！</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/settings">
                  Profile 
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild> 
                <Link href="/tickets">
                  Order
                </Link> 
              </DropdownMenuItem>
              <DropdownMenuItem asChild> 
                <Link href="/activitys">
                  Activate
                </Link> 
              </DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={() => logout()} variant="ghost">
            Logout
          </Button>
        </div>
      )}
    </>
  );
};
