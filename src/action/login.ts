"use server";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { revalidatePath, revalidateTag } from "next/cache";



export const login = async (values: z.infer<typeof LoginSchema>) => {
    console.log(values);
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
        };
    return { success: "Email sent!"}; 
    
};
