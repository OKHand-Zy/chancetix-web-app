'use client';
import { useTransition, useState } from 'react';
import { set, useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { CardWrapper } from '@/components/auth/card-wrapper';
import { ResetSchema } from '@/schemas';

import { Input } from '@/components/ui/Shadcn/input';
import { Button } from '@/components/ui/Shadcn/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Shadcn/form';

import { FormError } from '@/components/Login/form-error';
import { FormSuccess } from '@/components/Login/form-success';
import { reset } from '@/action/reset';

export const ResetForm = () => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const from = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError('');
    setSuccess('');
    startTransition(() => {
      reset(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Forgot your password?"
      backButtonLabel="Back to Login"
      backButtonHref="/auth/login"
    >
      <Form {...from}>
        <form onSubmit={from.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={from.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email：</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Email"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            Send reset email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
