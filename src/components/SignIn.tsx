'use client';


import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import Link from 'next/link'


function SignIn() {

    const Text = {
        "title": "TaxPal",
        "message": "Sign in to your account to continue",
    }

    return (
        <div className='min-h-screen h-screen w-full flex items-center justify-center '>
            <div className='w-full md:w-[45%] xl:w-[40%] p-2 flex flex-col justify-center items-center bg-white shadow rounded-md'>
                <div className='w-full flex flex-col items-center justify-center'>
                    <h1 className='text-sm md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-black font-bold'>{Text.title}</h1>
                    <span className='text-xs md:text-sm xl:text-lg 2xl:text-xl'>{Text.message}</span>
                </div>
                <div className='flex flex-col w-full p-2 space-y-1 mt-2 md:mt-3'>
                    <div className='w-full  flex flex-col space-y-1'>
                        <Label className='text-xs  md:text-sm lg:text-lg 2xl:text-xl'>Username</Label>
                        <Input 
                        placeholder='Enter your username'
                        />
                    </div>
                    <div className='w-full flex flex-col space-y-1 mt-1 md:mt-2'>
                        <div className='flex flex-row items-center justify-between'>
                            <Label className='text-xs  md:text-sm lg:text-lg 2xl:text-xl'>Password</Label>
                            <span className='text-[10px] md:text-xs'>forgot password?</span>
                        </div>
                        <Input 
                        placeholder='Enter your password'
                        />
                    </div>
                    <Button
                    className='bg-blue-500 text-white mt-2 md:mt-3 text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-xl'
                    >Sign in</Button>

                    <div className='w-full flex justify-center mt-2'>
                        <span className='flex gap-1 text-xs md:text-sm 2xl:text-md text-gray-500 font-semibold'>Don't have an account? <Link href="/user/sign-up" className="text-blue-500 hover:underline">Sign up</Link></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn;
