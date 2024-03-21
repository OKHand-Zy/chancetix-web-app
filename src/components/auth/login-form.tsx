"use client";
import { useTransition, useState } from "react";
import { set, useForm } from "react-hook-form";
import Link from "next/link";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";

import {CardWrapper} from "@/components/auth/card-wrapper";
import { LoginSchema } from "@/schemas";

import { Input } from "@/components/ui/Shadcn/input";
import { Button } from "@/components/ui/Shadcn/button";
import { 
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/Shadcn/form"

import { FormError } from "@/components/Login/form-error";
import { FormSuccess } from "@/components/Login/form-success";
import { login } from "@/action/login";




export const LoginForm = () => {
    const searchParams = useSearchParams();
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
        ? "Email already in use with diffrent provider"
        : "";
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const from = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            login(values)
            .then((data) => {
                setError(data?.error);
                setSuccess(data?.success);
            });
        });
    }

  return (
    <CardWrapper 
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...from}>
          <form 
              onSubmit = {from.handleSubmit(onSubmit)}
              className="space-y-6"
          >
              <div className="space-y-4">
                  <FormField
                      control={from.control}
                      name = "email"
                      render={({ field}) => (
                          <FormItem>
                              <FormLabel>Email：</FormLabel>
                              <FormControl> 
                                  <Input {...field} 
                                      disabled={isPending}
                                      placeholder="Email"
                                      type="email"
                                  /> 
                              </FormControl>
                              <FormMessage />
                          </FormItem>
                      )}
                  />
                  <FormField
                      control={from.control}
                      name = "password"
                      render={({ field}) => (
                          <FormItem>
                              <FormLabel>Password：</FormLabel>
                              <FormControl> 
                                  <Input {...field} 
                                    disabled={isPending}
                                    placeholder="密碼"
                                    type="password"
                                  /> 
                              </FormControl>
                              <Button
                                size = "sm"
                                variant="link"
                                asChild
                                className="px-0 font-normal"
                              >
                                <Link href={"/auth/reset"}>
                                  Forgot Password?
                                </Link>
                              </Button>
                              <FormMessage />
                          </FormItem>
                      )}
                  />    
              </div>
              <FormError message={error || urlError}/>
              <FormSuccess message={success}/>
              <Button 
                  disabled={isPending}
                  type="submit"
                  className="w-full"
              >
                  Login
              </Button>
          </form>
      </Form>
      
    </CardWrapper>
  );
}