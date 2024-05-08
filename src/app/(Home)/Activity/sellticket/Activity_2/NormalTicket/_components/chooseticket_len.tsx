"use client";
import React, { useState } from 'react';

import { zodResolver } from "@hookform/resolvers/zod"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Shadcn/button"

import {
  Command,
  CommandEmpty,
  CommandList,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/Shadcn/command"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Shadcn/form"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Shadcn/popover"

import { toast } from "@/components/ui/Shadcn/use-toast"

interface ChooseTicketLenProps {
  fromName: string;
  volunteerList : { label: string, value: string }[];
}

const ChooseTicketLen: React.FC<ChooseTicketLenProps> = ({ 
  volunteerList,
  fromName
}) => {
  
  const FormSchema = z.object({
    language: z.string({
      required_error: "Please select a volunteer.",
    }),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const onSubmit = () => {
    console.log("submitted")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>{fromName}</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? volunteerList.find(
                            (language) => language.value === field.value
                          )?.label
                        : "Select Volunteer"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search ..."
                      className="h-9"
                    />
                    <CommandEmpty>No found.</CommandEmpty>
                    <CommandList>
                    <CommandGroup>
                      {volunteerList.map((language) => (
                        <CommandItem
                          value={language.label}
                          key={language.value}
                          onSelect={() => {
                            form.setValue("language", language.value)
                          }}
                        >
                          {language.label}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              language.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default ChooseTicketLen;