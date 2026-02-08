import VerificationEmmail from "@/emails/VerificationEmail";
import {Resend} from "resend";
import resend from "@/lib/resend";

export interface SendVerificationEmailProps {
    userName: string;
    email: string;
    otp: string;
}

export async function sendVerificationEmail({userName, email, otp}: SendVerificationEmailProps){
    try {
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Verify your email for TaxPal',
            react: VerificationEmmail({userName, otp})
        })
        return Response.json({
            success: true,
            message: 'Verification email sent successfully.'
        }, {status: 200});
    } catch (error) {
        console.error('Error sending verification email:', error);
        return Response.json({
            success: false,
            message: 'Failed to send verification email.'
        }, {status: 500});
    }
}