"use server";
import * as z from "zod";
import { db } from "@/lib/db";

import { TarnsferTixSchema } from "@/schemas";


export const transferTicket = async (
  values: z.infer<typeof TarnsferTixSchema>,
) => {
  const validatedFields = TarnsferTixSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  
}