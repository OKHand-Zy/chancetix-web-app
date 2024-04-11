"use server";

import * as z from "zod";
import { db } from "@/lib/db";

import { SettingsSchema } from "@/schemas";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";

export const settings = async(
    values: z.infer<typeof SettingsSchema>
) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  // 檢查 user.id 是否存在並且不是 undefined
  if (typeof user.id !== 'string') {
    return { error: "User ID is not valid" };
  }
  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "User not found" };
  }

  await db.user.update({
    where: {
      id: user.id
    },
    data: {
      ...values
    }
  });

  return { success: "Settings updated!" };
}