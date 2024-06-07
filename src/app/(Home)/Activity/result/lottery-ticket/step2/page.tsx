"use client";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from "@/components/ui/Shadcn/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Shadcn/form"
import { useForm, useFieldArray, FormProvider, SubmitHandler } from "react-hook-form"

import { Button } from "@/components/ui/Shadcn/button";
import { Input } from "@/components/ui/Shadcn/input";
import { useRouter } from 'next/navigation';

import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"

import LTicketFromStore from '@/store/LTicketFromStore'
import { ResultDataCheck } from "@/action/lottery-ticket/result-check";

// 定義志工數據的類型
interface VolunteerData {
  VType: string;
  name: string;
  cellphone: string;
  identity: string;
}

// 定義表單數據的類型
interface FormData {
  volunteers1: VolunteerData[];
  volunteers2: VolunteerData[];
}
const VolunteerSchema = z.object({
  VType: z.string(),
  name: z.string().min(1, { message: "Name is required" }),
  cellphone: z.string().length(10, { message: "Cellphone must be 10 digits" }),
  identity: z.string().length(10, { message: "Identity must be 10 digits" }),
});

const FormSchema = z.object({
  volunteers1: z.array(VolunteerSchema),
  volunteers2: z.array(VolunteerSchema),
});

function TicketUserStep2Page() {
  const router = useRouter();
  const { FVolunteer, SVolunteer, FVCount, SVCount, ACName, ticketType } = LTicketFromStore((state) => ({
    ACName: state.activityName,
    ticketType: state.ticketType,
    FVolunteer: state.FVolunteer,
    FVCount: state.FVCount,
    SVolunteer: state.SVolunteer,
    SVCount: state.SVCount,
  }));

  const defaultVolunteer: VolunteerData = { VType: '', name: '', cellphone: '', identity: '' };

  const methods = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      volunteers1: Array(FVCount).fill({ ...defaultVolunteer, VType: FVolunteer }),
      volunteers2: Array(SVCount).fill({ ...defaultVolunteer, VType: SVolunteer }),
    }
  });

  const { handleSubmit, control, reset } = methods;
  const { fields: volunteers1Fields } = useFieldArray({
    control,
    name: "volunteers1"
  });

  const { fields: volunteers2Fields } = useFieldArray({
    control,
    name: "volunteers2"
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const allUserData = [
      ...data.volunteers1.map(volunteer => ({
        volunteerType: volunteer.VType,
        customerName: volunteer.name,
        customerCellphone: volunteer.cellphone,
        customerIdentity: volunteer.identity,
      })),
      ...data.volunteers2.map(volunteer => ({
        volunteerType: volunteer.VType,
        customerName: volunteer.name,
        customerCellphone: volunteer.cellphone,
        customerIdentity: volunteer.identity,
      })),
    ];

    const result = await ResultDataCheck({
      activityName: ACName,
      actype: ticketType,
      volunteerF: FVolunteer,
      vFCounts: FVCount,
      volunteerS: SVolunteer,
      vSCounts: SVCount
    }, allUserData);

    if (result?.success === 'Create success!') {
      router.push(`/Activity/result/lottery-ticket/step3`);
    }
    if (result?.error === 'Create error!') {
      alert('DB have same data');
    }
    
  };

  const handleBackClick = () => { 
    LTicketFromStore.getState().resetTicketData();
    LTicketFromStore.persist.clearStorage();
    router.push(`/Activity/info/${ACName}`);
  };

  return (
    <FormProvider {...methods}>
      <Card className="w-full text-center">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            🎫 Tickets User Info
          </CardTitle>
          <CardDescription className=""> 
            Input your User Info
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <p>Volunteer 1：{FVolunteer}</p>
            {volunteers1Fields.map((field, index) => (
              <div key={field.id} className="flex flex-row items-center justify-around gap-x-4"> 
                <p>
                  Ticket{index+1}.：
                </p>   
                <FormField
                  control={control}
                  name={`volunteers1.${index}.name`}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Name：</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={control}
                  name={`volunteers1.${index}.identity`}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Identity：</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="AXXXXXXXXX"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`volunteers1.${index}.cellphone`}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Cellphone：</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="09XXXXXXXX"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}

            <hr/>

            <p>Volunteer 2：{SVolunteer}</p>
            {volunteers2Fields.map((field, index) => (
              <div key={field.id} className="flex flex-row items-center justify-around gap-x-4">
                <p>
                  Ticket{index+1}.：
                </p>
                <FormField
                  control={control}
                  name={`volunteers2.${index}.name`}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Name：</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`volunteers2.${index}.identity`}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Identity：</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="AXXXXXXXXX"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`volunteers2.${index}.cellphone`}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Cellphone：</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="09XXXXXXXX"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              </div>
            ))}
          </CardContent>
          
          <CardFooter className="flex justify-center space-x-24">
            <Button type="button" variant="default" onClick={handleBackClick}>
              Cancel
            </Button>
            <Button variant="default" type="submit">
              Next
            </Button>
          </CardFooter>
        </form>
      </Card>
    </FormProvider>
  );
}

export default TicketUserStep2Page;
