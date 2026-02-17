import UserModel from "@/models/userModel";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/generateToken";

export async function POST (request: Request){
    await dbConnect();
    try {
        const {userName, password} = await request.json();
        const existingUser = await UserModel.findOne({
            userName,
            isVerified: true
        });

        if(!existingUser){
            return NextResponse.json({
                success: false,
                message: 'Invalid username or password.'
            },{status: 400});
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordValid){
            return NextResponse.json({
                success: false,
                message: 'Invalid username or password.'
            },{status: 400});
        }
        const token = generateToken({userName, email: existingUser.email});

        const response = NextResponse.json({
            success: true,
            token,
            message: 'Login successful.'
        });
        response.cookies.set('token', token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60, // 7 days
            path: '/',
        })
        return response;
    } catch (error) {
        console.error('Error in sign-in route:', error);
        return NextResponse.json({
            success: false,
            message: 'An error occurred during login. Please try again later.'
        },{status: 500});
    }
}