import UserModel from "@/models/userModel";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";


export async function POST(request: Response){
    await dbConnect();
    try {
        const {userName, email, password, otp, country} = await request.json();
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
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await UserModel.create({
            userName,
            email,
            password: hashedPassword,
            verificationCode,
            isVerified: false,
            verificationCodeExpiery: new Date(Date.now() + 15 * 60 * 1000),
            country,
        })

    } catch (error) {
        
    }
}