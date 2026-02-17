'use client';


import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import TransactionLogs from './TransactionLogs';
import {useForm} from 'react-hook-form';
import { authServices } from '@/services/authServices';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SignInFormData{
    userName: string;
    password: string;
}

function SignIn() { 

    const[isOpenModal, setIsOpenModal] = useState(false);
    const {register, handleSubmit, formState:{isSubmitting, errors}} = useForm<SignInFormData>();
    const [loading, setLoading] = useState(false);
    const Text = {
        "title": "TaxPal",
        "message": "Sign in to your account to continue",
    }

    const TransactionLabels ={
        heading: "Record New Income",
        message: "Add detais about your income to track finances better.",
        title: "Add Income"
    }
    
    const onSubmit = async(data: SignInFormData) => {
        try {
            setLoading(true);
            console.log('Form data:', data);
            const response = await authServices.login(data);
            console.log('Login resp:',response.data);
            if(response.data.success){
                //document.cookie = `token=${response.data.token}; path=/; max-age=3600`; // Set token cookie for 1 hour
                window.location.href = '/view/dashboard'; // Redirect to dashboard after successful login
            }
        } catch (error) {
            console.error('Error during login:', error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className='min-h-screen h-screen w-full flex items-center justify-center '>
            <div className='w-full md:w-[45%] xl:w-[40%] p-2 flex flex-col justify-center items-center bg-white shadow rounded-md'>
                <div className='w-full flex flex-col items-center justify-center'>
                    <h1 className='text-sm md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-black font-bold'>{Text.title}</h1>
                    <span className='text-xs md:text-sm xl:text-lg 2xl:text-xl'>{Text.message}</span>
                </div>
                <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col w-full p-2 space-y-1 mt-2 md:mt-3'>
                    <div className='w-full  flex flex-col space-y-1'>
                        <Label className='text-xs  md:text-sm lg:text-lg 2xl:text-xl'>Username</Label>
                        <Input 
                        id='userName'
                        {...register('userName', { required: 'Username is required' })}
                        placeholder='Enter your username'
                        />
                        {errors?.userName && <span className='text-red-500 text-xs'>{errors.userName.message}</span>}
                    </div>
                    <div className='w-full flex flex-col space-y-1 mt-1 md:mt-2'>
                        <div className='flex flex-row items-center justify-between'>
                            <Label className='text-xs  md:text-sm lg:text-lg 2xl:text-xl'>Password</Label>
                            <span className='text-[10px] md:text-xs'>forgot password?</span>
                        </div>
                        <Input 
                        id='password'
                        type='password'
                        {...register('password', { required: 'Password is required' })}
                        placeholder='Enter your password'
                        />
                    </div>
                    <Button
                    type='submit'
                    disabled={loading}
                    className='bg-blue-500 text-white mt-2 md:mt-3 text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-xl'
                    >{loading ? (<Loader2 className="animate-spin h-5 text-white"/>):('Sign In')}</Button>

                    <div className='w-full flex justify-center mt-2'>
                        <span className='flex gap-1 text-xs md:text-sm 2xl:text-md text-gray-500 font-semibold'>Don't have an account? <Link href="/user/sign-up" className="text-blue-500 hover:underline">Sign up</Link></span>
                    </div>
                </div>
                </form>
            </div>
            {
                isOpenModal &&(
                    <TransactionLogs heading={TransactionLabels.heading} message={TransactionLabels.message} title={TransactionLabels.title}/>
                )
            }
        </div>
    )
}

export default SignIn;
