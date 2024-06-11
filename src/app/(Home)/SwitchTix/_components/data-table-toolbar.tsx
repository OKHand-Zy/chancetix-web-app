"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/Shadcn/button"
import { Input } from "@/components/ui/Shadcn/input"
import { DataTableViewOptions } from "./data-table-view-options"

import { TixTypes, TixGroups } from "../_data/data"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
{/* Filter Search Input 與 Status , Priority 按鈕*/}
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        
        <Input
          placeholder="Search EventName..."
          value={(table.getColumn("eventName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("eventName")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {table.getColumn("ticketType") && (
          <DataTableFacetedFilter
            column={table.getColumn("ticketType")}
            title="TicketType"
            options={TixTypes}
          />
        )}

        {table.getColumn("ticketGroup") && (
          <DataTableFacetedFilter
            column={table.getColumn("ticketGroup")}
            title="TicketGroup"
            options={TixGroups}
          />
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}

      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
