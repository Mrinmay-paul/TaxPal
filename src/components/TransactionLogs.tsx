import React, { useState } from 'react'
import { TransactionLogType } from '@/types/transactionLogType'
// import {useForm} from 'react-hook-form';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';

export interface TransactionLogProps {
    heading: string;
    message: string;
    title: string;
}

function TransactionLogs({heading, message, title}: TransactionLogProps) {
    const [onClose, setOnClose] = useState(false);
    return (
        <div className='flex items-center justify-center'>
            <div className='bg-white p-4'>
                <div className='flex flex-row'>
                    <div className='flex flex-col'>
                        <h1 className='text-black text-sm md:text-md xl:text-lg font-semibold'>{heading}</h1>
                        <span className='text-xs xl:text-sm text-gray-400'>{message}</span>
                    </div>
                    <button onClick={()=> setOnClose(true)}>x</button>
                </div>
                <div className='flex flex-col p-2'>
                    <div className='flex flex-row'>
                        <h3 className='text-black text-sm md:text-md xl:text-lg font-semibold'>{title}</h3>
                        <button>x</button>
                    </div>
                    <div className='flex flex-row'>
                        <div className='flex flex-col'>
                            <Label className='text-black text-xs font-semibold'>Description</Label>
                            <Input/>
                        </div>
                        <div className='flex flex-col'>
                            <Label className='text-black text-xs font-semibold'>Amount</Label>
                            <Input/>
                        </div>
                    </div>
                    <div className='flex flex-row'>
                        <div className='flex flex-col'>
                            <Label className='text-black text-xs font-semibold'>Ctegory</Label>
                            <Input/>
                        </div>
                        <div className='flex flex-col'>
                            <Label className='text-black text-xs font-semibold'>Date</Label>
                            <Input/>
                        </div>
                    </div>
                    <div>
                        <Label className='text-black text-xs font-semibold'>Notes (Optional)</Label>
                        <textarea name="" id="">

                        </textarea>
                    </div>
                    <div>
                        <Button>Cancel</Button>
                        <Button>Save</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TransactionLogs
