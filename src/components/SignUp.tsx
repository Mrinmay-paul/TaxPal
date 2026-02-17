'use client';


import React,{useState} from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { authServices } from '@/services/authServices';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SignUpFormData{
    username: string;
    password: string;
    fullName: string;
    verificationCode: string;
    email: string;
    country: string;
    incomeBracket?: string;
}

function SignUp() {
    const [loading, setLoading] = useState(false);
    const [loadingVerification, setLoadingVerification] = useState(false);
    const [verificationSent, setVerificationSent] = useState(false);
    const Text = {
        "title" : "Create an Account",
        "message": "Enter your information to create your TaxPal account"
    }
    const {register, handleSubmit, formState:{isSubmitting, errors}, watch} = useForm<SignUpFormData>();

    const onSubmit = async (data: SignUpFormData) => {
        try {
            setLoading(true);
            const response = await authServices.signUp(data);
            console.log('Signup resp:',response.data);
            if(response.data.success){
                //document.cookie = `token=${response.data.token}; path=/; max-age=3600`; // Set token cookie for 1 hour
                window.location.href = '/view/dashboard'; // Redirect to dashboard after successful sign-up
            }
        } catch (error) {
            console.error('Error during sign up:', error);
        } finally {
            setLoading(false);
        }
    };

    const handelSendVerificationMail = async() => {
        const email = watch('email');
        const username = watch('username');
        if(!email || !username){
            return;
        }
        const payload = {
            email: email,
            username: username,
        }
        try {
            setLoadingVerification(true);
            const response = await authServices.sendVerificationMail(payload);
            if(response.data.success){
                setVerificationSent(true);
            }
            console.log('Verification mail response:', response.data);
        } catch (error) {
            console.error('Error sending verification mail:', error);
        } finally {
            setLoadingVerification(false);
        }
    }
    return (
        <div className='min-h-screen h-full  w-full flex items-center justify-center '>
            <div className='w-full md:w-[45%] xl:w-[40%] p-2 flex flex-col justify-center items-center bg-white shadow rounded-md'>
                <div className='w-full flex flex-col items-center justify-center'>
                    <h1 className='text-sm md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-black font-bold'>{Text.title}</h1>
                    <span className='text-xs md:text-sm xl:text-lg 2xl:text-xl'>{Text.message}</span>
                </div>
                <form
                className='w-full'
                onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col w-full p-2 space-y-1 mt-2 md:mt-3'>
                    <div className='w-full  flex flex-col space-y-1'>
                        <Label className='text-xs  md:text-sm lg:text-lg 2xl:text-xl'>Username</Label>
                        <Input 
                        id='username'
                        {...register('username', { required: 'Username is required' })}
                        placeholder='Choose a username'
                        />
                        {errors?.username && <span className='text-red-500 text-xs'>{errors.username.message}</span>}
                    </div>
                    <div className='w-full flex flex-col space-y-1 mt-1 md:mt-2'>
                        <Label className='text-xs  md:text-sm lg:text-lg 2xl:text-xl'>Password</Label>
                        <Input 
                        id='password'
                        type='password'
                        {...register('password', { required: 'Password is required' })}
                        placeholder='Choose a password'
                        />
                        {errors?.password && <span className='text-red-500 text-xs'>{errors.password.message}</span>}
                    </div>
                    <div className='w-full flex flex-col space-y-1 mt-1 md:mt-2'>
                        <Label className='text-xs  md:text-sm lg:text-lg 2xl:text-xl'>Full Name</Label>
                        <Input 
                        id='fullName'
                        {...register('fullName', { required: 'Full Name is required' })}
                        placeholder='Enter your full name'
                        />
                        {errors?.fullName && <span className='text-red-500 text-xs'>{errors.fullName.message}</span>}
                    </div>
                    <div className='w-full flex flex-col space-y-1 mt-1 md:mt-2'>
                        <Label className='text-xs  md:text-sm lg:text-lg 2xl:text-xl'>Email</Label>
                        <div
                        className='relative flex w-full items-center'
                        >
                            <Input 
                        id='email'
                        type='email'
                        {...register('email', { 
                            required: 'Email is required',
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: 'Email is invalid'
                            }
                        })}
                        placeholder='Enter your email address'
                        />
                        {errors?.email && <span className='text-red-500 text-xs'>{errors.email.message}</span>}
                        <button
                        type='button'
                        disabled={loadingVerification}
                        onClick={handelSendVerificationMail}
                        className='absolute right-2 top-2 text-blue-500 text-xs font-semibold '>
                            {loadingVerification ? (<Loader2 className='animate-spin h-4 text-blue-500'/>) : ('verify')}
                        </button>
                        </div>
                    </div>
                    {verificationSent && (
                        <div className='w-full flex flex-col space-y-1 mt-1 md:mt-2'>
                            <Input
                            id='verificationCode'
                            {...register('verificationCode', { required: 'Verification Code is required' })}
                            placeholder='Enter verification code'
                            />
                            {errors?.verificationCode && <span className='text-red-500 text-xs'>{errors.verificationCode.message}</span>}
                        </div>
                    )}
                    <div className='w-full flex flex-col space-y-1 mt-1 md:mt-2'>
                        <Label className='text-xs  md:text-sm lg:text-lg 2xl:text-xl'>Country</Label>
                        <Input 
                        id='country'
                        {...register('country', { required: 'Country is required' })}
                        placeholder='Select your Country'
                        />
                        {errors?.country && <span className='text-red-500 text-xs'>{errors.country.message}</span>}
                    </div>
                    <div className='w-full flex flex-col space-y-1 mt-1 md:mt-2'>
                        <Label className='text-xs  md:text-sm lg:text-lg 2xl:text-xl'>Income Bracket (Optional)</Label>
                        <Input 
                        id='incomeBracket'
                        {...register('incomeBracket')}
                        placeholder='Select your Income bracket'
                        />
                    </div>
                    <Button
                    type='submit'
                    disabled={isSubmitting || loading}
                    className='bg-blue-500 text-white mt-2 md:mt-3 text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-xl'
                    >
                        {loading ? (<Loader2 className='animate-spin h-6 text-white font-bold'/>) : ('Create Account')}
                    </Button>

                    <div className='w-full flex justify-center mt-2'>
                        <span className='flex gap-1 text-xs md:text-sm 2xl:text-md text-gray-500 font-semibold'>Already have an account? <Link href="/user/sign-in" className="text-blue-500 hover:underline">Sign in</Link></span>
                    </div>
                </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp;
