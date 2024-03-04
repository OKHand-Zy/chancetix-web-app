"use client";
import { useTransition, useState } from "react";
import { set, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {CardWrapper} from "@/components/auth/card-wrapper";
import { RegisterSchema } from "@/schemas";

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
import { register } from "@/action/register";




export const RegisterForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const from = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
        }
    });

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            register(values)
            .then((data) => {
                setError(data.error);
                setSuccess(data.success);
            });
        });
    }

    return (
        <CardWrapper 
            headerLabel="Create an account"
            backButtonLabel="Already have an account? Login"
            backButtonHref="/auth/login"
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
                            name = "name"
                            render={({ field}) => (
                                <FormItem>
                                    <FormLabel>Name：</FormLabel>
                                    <FormControl> 
                                        <Input {...field} 
                                            disabled={isPending}
                                            placeholder="Name"
                                        /> 
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                                            placeholder="******"
                                            type="password"
                                        /> 
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />    
                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <Button 
                        disabled={isPending}
                        type="submit"
                        className="w-full"
                    >
                        Create Account
                    </Button>
                </form>
            </Form>
            
        </CardWrapper>
    );
}