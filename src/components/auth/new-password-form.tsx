'use client';
import { useTransition, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { set, useForm } from 'react-hook-form';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CardWrapper } from '@/components/auth/card-wrapper';
import { NewPasswordSchema } from '@/schemas';

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
import { newPassword } from '@/action/new-password';

export const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token'); // get token from url

  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const from = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError('');
    setSuccess('');
    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Enter your new password?"
      backButtonLabel="Back to Login"
      backButtonHref="/auth/login"
    >
      <Form {...from}>
        <form onSubmit={from.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={from.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password：</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
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
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            Reset Password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
