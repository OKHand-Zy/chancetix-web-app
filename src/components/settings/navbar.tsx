"use client";

import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/Shadcn/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Topbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm">
      <div className="flex gap-x-2">
        {/*
        <Button asChild 
          variant={pathname === "/profile/server" ? "default" : "outline"}>
          <Link href={"/profile/server"}>Server</Link>
        </Button>
        <Button asChild 
          variant={pathname === "/profile/client" ? "default" : "outline"}>
          <Link href={"/profile/client"}>Client</Link>
        </Button>
        <Button asChild 
          variant={pathname === "/profile/admin" ? "default" : "outline"}>
          <Link href={"/profile/admin"}>Admin</Link>
        </Button>
        */}
        <Button asChild 
          variant={pathname === "/profile/settings" ? "default" : "outline"}>
          <Link href={"/profile/settings"}>Settings</Link>
        </Button>
        <Button asChild 
          variant={pathname === "/profile/tickets" ? "default" : "outline"}>
          <Link href={"/profile/tickets"}>Tickets</Link>
        </Button>
        <Button asChild 
          variant={pathname === "/profile/activitys" ? "default" : "outline"}>
          <Link href={"/profile/activitys"}>Activitys</Link>
        </Button>
      </div>
      <UserButton />
    </nav>
  );
}