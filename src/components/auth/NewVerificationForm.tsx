"use client";
import { useCallback, useEffect, useState } from "react";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "@/components/Login/form-error";
import { FormSuccess } from "@/components/Login/form-success";
import { BeatLoader} from "react-spinners" 

import { useSearchParams } from "next/navigation";
import { newVerification } from "@/action/new-verification";
export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) {
      return;
    }

    if (!token) {
      setError("Miss token!");
      return;
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("something went wrong!");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
      <CardWrapper
        headerLabel="Confirm Email"
        backButtonLabel="Back to Login"
        backButtonHref="/auth/login"
      >
        <div className="flex item-center w-full justify-center">
          {!error && !success && (<BeatLoader/>)}
          <FormSuccess message={success}/>
          {!success && (<FormError message={error}/>)}
        </div>
      </CardWrapper>
  )
}