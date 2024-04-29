// utils/email/sendVerificationEmail.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.AUTH_RESEND_KEY);

export const sendVerificationEmail = async (
    email: string,
    token: string
) => {
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Confirm your email",
        html: `
            <p>Dear TechHub Member,</p>
            
            <p>Thank you for joining our vibrant community at TechHub! We're excited to have you on board.</p>
            <p>To ensure the security of your account and access to all our exclusive features, please click the link below to verify your email address:</p>
            <p><a href="${confirmLink}">Verify Email Address</a></p>
            <p>Warm regards,</p>

            <p>The TechHub Team</p>
        `
    });
}
