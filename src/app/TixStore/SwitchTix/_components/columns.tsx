"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/Shadcn/badge"
import { Checkbox } from "@/components/ui/Shadcn/checkbox"

import { EventTypes, TixTypes } from "../_data/data"
import {TicketsColumnSchema} from "../_data/schema"

import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

// 它定義了一個用於數據表格（DataTable）的列（column）配置。
// 這個配置包含了
// 列的鍵（id(accessorKey)）
// 標題（header）
// 單元格（cell）的渲染方式 
// 篩選函數（filterFn）
// 每一條資料都由以下資料組合成一行
export const columns: ColumnDef<TicketsColumnSchema>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "serialNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SerialNumber" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("serialNumber")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "eventName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="EventName" />
    ),
    cell: ({ row }) => {
      const EventType = EventTypes.find((label) => label.value.includes(row.original.eventName) )

      return (
        <div className="flex space-x-2">
          {EventType && <Badge>{EventType.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("eventName")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "ticketType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TicketType" />
    ),
    cell: ({ row }) => {
      const TixType = TixTypes.find(
        (TixType) => TixType.value === row.getValue("ticketType")
      )

      if (!TixType) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          {TixType.icon && (
            <TixType.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{TixType.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "ticketGroup",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TicketGroup" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("ticketGroup")}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "position",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Position" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("position")}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("price")}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  /* 每條的 option 選項
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
  */
]
