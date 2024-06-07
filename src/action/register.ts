"use server";
import * as z from "zod";
import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { revalidatePath, revalidateTag } from "next/cache";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

import bcrypt from "bcryptjs";

function isValidTaiwanID(id: string): boolean {
  const regex = /^[A-Z][1-2]\d{8}$/;
  const letterMap: Record<string, number> = {
    "A": 10,
    "B": 11,
    "C": 12,
    "D": 13,
    "E": 14,
    "F": 15,
    "G": 16,
    "H": 17,
    "I": 34,
    "J": 18,
    "K": 19,
    "L": 20,
    "M": 21, 
    "N": 22,
    "O": 35,
    "P": 23,
    "Q": 24,
    "R": 25,
    "S": 26,
    "T": 27,
    "U": 28,
    "V": 29,
    "W": 32,
    "X": 30,
    "Y": 31,
    "Z": 33
  }; // 身份证首字母对应数字表

  // 验证格式
  if (!regex.test(id)) return false;

  // 验证首字母
  const firstLetter = id.charAt(0);
  const firstLetterIndex = letterMap[firstLetter]; // 对应数字表的索引，加 10
  const idWithFirstDigit = `${firstLetterIndex}${id.slice(1)}`;

  // 验证校验码
  const weights = [1, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1];
  const idArray = idWithFirstDigit.split('').map(Number);
  const sum = idArray.reduce((acc, digit, index) => acc + digit * weights[index], 0);
  return sum % 10 === 0;
}

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  console.log(values);
  // 確認資料符合 schema 規則
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  };

  // 把拿進來的資料定義成 email password name 
  const { password, name, identity , cellphone } = validatedFields.data;
  const { email: rawEmail } = validatedFields.data;
  const email = rawEmail.toLocaleLowerCase();
  
  // 產生 hash 密碼 加鹽 10 次
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // 確認 email 是否已經被使用
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: "Email already use!" };
  }

  // 驗證 新式居留證 與 身份證 格式
  const user_Id = identity.toUpperCase()
  if (!isValidTaiwanID(user_Id)) {
    return { error: "身分證或居留證格式有錯!" };
  }
  const hashedUserId = await bcrypt.hash(user_Id, 10);

  // 寫入資料到資料庫
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      identity: hashedUserId,
      cellphone: cellphone
    },
  });

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token,
  );
  return { success: "Confication email sent!" };
  
};
