import * as React from 'react';

export interface EmailProps {
    userName: string;
    otp: string;
}

export default function VerificationEmmail({ userName, otp}: EmailProps){
    return (
        <div>
            <h1>Hello {userName},</h1>
            <p>Thank you for signing up. Please use the following OTP to verify your email address:</p>
            <h2>{otp}</h2>
            <p>This OTP is valid for 15 minutes. If you did not sign up for an account, please ignore this email.</p>
            <p>Best regards,<br/>The TaxPal Team</p>
        </div>
    )
}