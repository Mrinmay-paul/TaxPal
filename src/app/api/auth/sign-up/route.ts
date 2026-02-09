import UserModel from "@/models/userModel";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import OTPModel from "@/models/otpModel";
import { generateToken } from "@/lib/generateToken";

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

        const existingOTP = await OTPModel.findOne({
            email,
            otp,
            expiresAt: { $gt: new Date() }
        })

        if(!existingOTP){
            return Response.json({
                success: false,
                message: 'Invalid or expired OTP.'
            }, {status: 400});
        }
        if(existingOTP?.otp !== otp){
            return Response.json({
                success: false,
                message: 'Invalid Otp.'
            }, {status: 400})
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const token = generateToken({_id: existingOTP._id.toString(), email});
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

        return Response.json({
            success: true,
            message: 'User registered successfully.',   
            user: newUser
        }, {status: 201});  

    } catch (error) {
        console.error('Error during user registration:', error);
        return Response.json({
            success: false,
            message: 'Failed to register user.'
        }, {status: 500});
    }
}