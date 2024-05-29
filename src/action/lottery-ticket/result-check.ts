"use server";
import * as z from "zod";
import { db } from "@/lib/db";

import { LTixSchema, LTixUserSchema } from "@/schemas";
import {LTixUpdateSerNumber} from "@/data/ticket";

export const ResultDataCheck = async (
  TicketData: z.infer<typeof LTixSchema>,
  //UserData: z.infer<typeof LTixUserSchema>,
) => {
  // 確認 票卷 跟 使用者 資料符合規範
  const LTixData = LTixSchema.safeParse(TicketData);
  if (!LTixData.success) {
      return { error: "Invalid fields!" };
  }
  //const LTixUserData = LTixUserSchema.safeParse(UserData);
  //if (!LTixUserData.success) {
  //    return { error: "Invalid fields!" };
  //}

  // 建立 票卷資料
  const acName = LTixData.data.activityName
  const lastSerData = await LTixUpdateSerNumber(acName);
  let newSerialNumber = "";
  if (lastSerData) {
    if (lastSerData.length === 0) {
      newSerialNumber = acName+"-"+"001"
    } else {
      const lastSerNumber = lastSerData[0].acSerNumber
      if (lastSerNumber !== null) {
        const lastNumber_str = lastSerNumber.split("-")[1];
        const newNumber = (parseInt(lastNumber_str) + 1).toString().padStart(3, '0');
        newSerialNumber = `${acName}-${newNumber}`;
      }
    }
    await db.lTicket.create({
      data: {
        activityName: LTixData.data.activityName,
        acSerNumber: newSerialNumber,
        volunteer1: LTixData.data.volunteer1,
        v1tickets: LTixData.data.v1tickets,
        volunteer2: LTixData.data.volunteer2,
        v2tickets: LTixData.data.v2tickets,
      },
    })
  }

}