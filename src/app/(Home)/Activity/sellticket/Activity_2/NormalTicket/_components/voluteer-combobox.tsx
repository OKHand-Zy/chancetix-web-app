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

import NumberButton from './count-button';
import LTicketFromStore from '@/store/LTicketFromStore'


interface VComboboxProps {
  fromLabel: string;
  formDescrip: string;
  volunteerList : { label: string, value: string }[];
  VType: string;
}

const VoluteerCombobox: React.FC<VComboboxProps> = ({ 
  fromLabel,
  formDescrip,
  volunteerList,
  VType,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>(''); // 新增的状态

  function updateVolunteerInfo(VValue: string) {
    LTicketFromStore.getState().UpdateVolunteer(VType, VValue);
  }


  const handleSelect = (value: string) => {
    setSelectedValue(value);
    updateVolunteerInfo(value); // 当用户选择时，调用 onValueChange 回调函数
  };

  const FormSchema = z.object({
    volunteer: z.string({
      required_error: "Please select a volunteer.",
    }),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const onCheck = () => {
    if (selectedValue.trim() === '') {
      form.handleSubmit(onSubmit)();
    }
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
  } // 需要調整目前不會觸發 form error 顯示 FormDescription

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="volunteer"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>{fromLabel}</FormLabel>
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
                            (volunteer) => volunteer.value === field.value
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
                      {volunteerList.map((volunteer) => (
                        <CommandItem
                          value={volunteer.label}
                          key={volunteer.value}
                          onSelect={() => {
                            form.setValue("volunteer", volunteer.value)
                            handleSelect(volunteer.value)
                          }}
                        >
                          {volunteer.label}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              volunteer.value === field.value
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
              <FormDescription>
                {formDescrip}
              </FormDescription>  
              <FormMessage />
            </FormItem>
          )}
        />
        
      </form>
    </Form>
  );
};

export default VoluteerCombobox;