"use server"

import bcrypt from "bcryptjs";
import * as z from "zod";

import prisma from "@/lib/prisma";
import { registerSchema } from "@/lib/validation";
import { getUserByEmail } from "../../data/user";

import { generateVerificationToken } from "@/lib/tokens";

import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof registerSchema>) => {
    const validatedFields = registerSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, password, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return { error: "Email already in use!" }
    }

    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        }
    })

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
        verificationToken.email, 
        verificationToken.token
    )

    return { success: "Confirmation email sent" }
}