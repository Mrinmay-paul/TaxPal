import UserModel from "@/models/userModel";
import dbConnect from "@/lib/dbConnect";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import OTPModel from "@/models/otpModel";
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

export async function POST(request: Request){
    await dbConnect();
    try {
        const {email, userName} = await request.json();
        const existingUser = await UserModel.findOne({
            email,
            isVerified: true,
        });
        if(existingUser){
            return Response.json({
                success: false,
                message: 'Email already verified. Please login.'
            },{status: 400});
        }
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const emailResponse = await sendVerificationEmail({email, userName, otp: verificationCode});
        if(!emailResponse.ok){
            return Response.json({
                success: false,
                message: 'Failed to send verification email.'
            }, {status: 500});
        }
        await redis.set(`otp:${email}`, verificationCode, 'EX', 15 * 60);
        // const newOTP = await OTPModel.create({
        //     email,
        //     otp: verificationCode,
        //     expiresAt: new Date(Date.now() + 15 * 60 * 1000),
        // });
        // if(!newOTP){
        //     return Response.json({
        //         success: false,
        //         message: 'Failed to generate OTP.'
        //     }, {status: 500});
        // }
        return Response.json({
            success: true,
            message: 'Verification email sent successfully.',
            otp: verificationCode,
        }, {status: 200});

    } catch (error) {
        console.error('Error verifying email:', error);
        return Response.json({
            success: false,
            message: 'Failed to verify email.'
        }, {status: 500});
    }
}