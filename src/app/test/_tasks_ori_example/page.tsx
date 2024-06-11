import { db } from "@/lib/db"
import { Metadata } from "next"
import Image from "next/image"
import { z } from "zod"

import { columns } from "./_components/columns"
import { DataTable } from "./_components/data-table"
import { UserNav } from "./_components/user-nav"
import { taskSchema } from "./_data/schema"

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
async function getTasks() {
  // change this to read from your database
  
  // 使用 Prisma Client 從 Tasks 表中讀取所有任務
  const tasks = await db.tasks.findMany();
  // 使用 zod 進行驗證
  return z.array(taskSchema).parse(tasks);
}

export default async function SwitchTix() {
  const tasks = await getTasks()
  console.log(tasks)
  return (
    <div className="h-screen flex items-center justify-center ">
      <Card className="flex-1 flex-col space-y-8 p-8 md:flex"> 
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Welcome back!
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div>
        <DataTable data={tasks} columns={columns} />
      </Card>
    </div>
  )
}
