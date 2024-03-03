"use server";
import * as z from "zod";
import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { revalidatePath, revalidateTag } from "next/cache";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs";  //ref:https://blog.csdn.net/weixin_68714627/article/details/133216921

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    console.log(values);
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
        };
    
    const { email, password, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await getUserByEmail(email);
    
    if (existingUser) {
        return { error: "Email already use!" };
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });
    // TODO: Send Verification token Email
    return { success: "User Created!"}; 
    
};
