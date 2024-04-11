"use client";
import { useTransition } from "react";
import { useSession } from "next-auth/react";
import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/Shadcn/card";
import { Button } from "@/components/ui/Shadcn/button";
import { settings } from "@/action/settings";


const SettingPage = () => {
  const {update} = useSession();
  const [isPending, startTransition] = useTransition();
  const onClick = () => {
    startTransition( () => {
      settings({
        name: "new name",
      })
        .then(() => {
          update();
        })
    })
  }

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          ⚙️Setting
        </p>
      </CardHeader>
      <CardContent>
        <Button disabled={isPending} onClick={onClick}>
          Update name
        </Button>
      </CardContent>
    </Card>
  );
};

export default SettingPage;
