"use server";
import * as z from "zod";
import { db } from "@/lib/db";

import { LTixSchema, LTixUserSchema } from "@/schemas";
import {LTixUpdateSerNumber} from "@/data/ticket";



export const ResultDataCheck = async (
  TicketData: z.infer<typeof LTixSchema>,
  UserData: z.infer<typeof LTixUserSchema>,
) => {

  // 確認 票卷 跟 使用者 資料符合規範
  const LTixData = LTixSchema.safeParse(TicketData);
  if (!LTixData.success) {
    console.log("LTixData Invalid fields!")
    return { error: "Invalid fields!" };
  }

  const LTixUsersData = LTixUserSchema.safeParse(UserData);
  if (!LTixUsersData.success) {
    console.log("LTixUsers Invalid fields!")
    return { error: "Invalid fields!" };
  }

  // Future: Check 身份證 與 手機 與 資料是否有重複登記 

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
        actype: LTixData.data.actype || "",
        volunteerF: LTixData.data.volunteerF,
        vFCounts: LTixData.data.vFCounts,
        volunteerS: LTixData.data.volunteerS,
        vSCounts: LTixData.data.vSCounts,
        users: {
          create: LTixUsersData.data.map(user => ({
            volunteerType: user.volunteerType,
            customerName: user.customerName,
            customerCellphone: user.customerCellphone,
            customerIdentity: user.customerIdentity
          }))
        }
      },
    })

    console.log("Create OK")
  }



}