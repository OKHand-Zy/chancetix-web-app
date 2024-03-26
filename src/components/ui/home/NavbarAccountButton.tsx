"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/Shadcn/button"

import { getSession } from "next-auth/react"
import { useEffect, useState } from 'react';
import { signOutAccount } from "@/action/signOutAccount"


export const NavbarAccountButton = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession();
      setSession(sessionData);
    };

    fetchSession();
  }, []);
  const handleSignOut = async () => {
    try {
      await signOutAccount();
       // 登出成功後，重新設置 session 為 null
      setSession(null);
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  return (
    <>
      {!session ? (
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
          <p>Hi~ {session.user.name}</p>
          <Button onClick={handleSignOut} variant="ghost">
            Logout
          </Button>
        </div>
      )}
    </>
  );
};
