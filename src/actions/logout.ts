"use server"

import { signOut } from "@/auth"

export const logout = async () => {
    // TODO: ADD LOGOUT OPTIONS
    await signOut();
}