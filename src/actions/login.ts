"use server"

import * as z from "zod";

import { loginSchema } from "@/lib/validation";

export const login = async (values: z.infer<typeof loginSchema>) => {
const validatedFields = loginSchema.safeParse(values);

if (!validatedFields.success) {
    return { error: "Invalid fields!" };
}

return { success: "Email sent!"}
}