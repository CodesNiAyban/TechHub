"use server"

import * as z from "zod";

import { registerSchema } from "@/lib/validation";

export const register = async (values: z.infer<typeof registerSchema>) => {
const validatedFields = registerSchema.safeParse(values);

if (!validatedFields.success) {
    return { error: "Invalid fields!" };
}

return { success: "Email sent!"}
}