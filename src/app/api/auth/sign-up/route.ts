import UserModel from "@/models/userModel";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import OTPModel from "@/models/otpModel";
import { generateToken } from "@/lib/generateToken";
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

export async function POST(request: Response){
    await dbConnect();
    try {
        const {userName, fullName, email, password, otp, country} = await request.json();
        const existingUserByUserName = await UserModel.findOne({
            userName,
            isVerified: true
        });
        if(existingUserByUserName){
            return Response.json({
                success: false,
                message: 'username already taken.'
            },{status: 400});
        }
        const existingUserByEmail = await UserModel.findOne({
            email,
            isVerified: true
        });
        if(existingUserByEmail){
            return Response.json(
                {
                    success: false,
                    message: 'Email already register. Please login.'
                },
                {status: 400}
            );
        }
        const storedOTP = await redis.get(`otp:${email}`);
        if(!storedOTP){
            return Response.json({
                success: false,
                message: 'OTP expired or not found. Please request a new one.'
            }, {status: 400});
        }

        if(storedOTP !== otp){
            return Response.json({
                success: false,
                message: 'Invalid OTP. Please try again.'
            }, {status: 400});
        }
        // const existingOTP = await OTPModel.findOne({
        //     email,
        //     otp,
        //     expiresAt: { $gt: new Date() }
        // })

        // if(!existingOTP){
        //     return Response.json({
        //         success: false,
        //         message: 'Invalid or expired OTP.'
        //     }, {status: 400});
        // }
        // if(existingOTP?.otp !== otp){
        //     return Response.json({
        //         success: false,
        //         message: 'Invalid Otp.'
        //     }, {status: 400})
        // }
        await redis.del(`otp:${email}`); 

        const hashedPassword = await bcrypt.hash(password, 10);
        const token = generateToken({userName , email});
        const newUser = await UserModel.create({
            userName,
            fullName,
            email,
            token,
            password: hashedPassword,
            isVerified: true,
            country,
        })
        await OTPModel.deleteOne({email});

        const response = NextResponse.json({
            success: true,
            message: 'User registered successfully.',   
            user: newUser
        }, {status: 201});  

        response.cookies.set('token', token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60, // 7 days
            path: '/',
        });

        return response;
    } catch (error) {
        console.error('Error during user registration:', error);
        return Response.json({
            success: false,
            message: 'Failed to register user.'
        }, {status: 500});
    }
}