'use server';
import { signOut } from "@/auth";

export const signOutAccount = async () => {
    await signOut();
};