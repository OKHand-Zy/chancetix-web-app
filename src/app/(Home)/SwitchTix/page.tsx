import { db } from "@/lib/db"
import { Metadata } from "next"
import Image from "next/image"
import { z } from "zod"

import { columns } from "./_components/columns"
import { DataTable } from "./_components/data-table"
import { UserNav } from "./_components/user-nav"

import {SwitchTixSchema} from "./_data/schema"

import { 
  Card,
  CardContent
} from "@/components/ui/Shadcn/card"

// Web Matadata
export const metadata: Metadata = {
  title: "ChanceTix",
  description: "A task and issue tracker build using Tanstack Table.",
}

// Simulate a database read for tasks.
// change this to read from your database
async function getTickets() {
  const tickets = await db.switchTicket.findMany();
  return z.array(SwitchTixSchema).parse(tickets);
}

export default async function SwitchTix() {
  const SwitchTickets = await getTickets()
  //console.log(tickets)
  return (
    <div className="h-screen flex items-center justify-center ">
      <Card className="flex-1 flex-col space-y-8 p-8 md:flex"> 
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Welcome SwitchTix!
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
        </div>
        <DataTable data={SwitchTickets} columns={columns} />
      </Card>
    </div>
  )
}
