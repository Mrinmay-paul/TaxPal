'use client'

import React from 'react'
import { House, BookType, BadgeDollarSign, NotebookText   } from 'lucide-react';
import { link } from 'fs';
import Image from 'next/image';

function SideNavbar() {
    const [isActive, setIsActive] = React.useState(1);

    const navItems = [
        {id: 1, name: 'Dashboard', icon : <House/>, link: '/view/dashboard'},
        {id: 2, name: 'Transactions', icon: <BadgeDollarSign/>, link: '/view/transactions'},
        {id: 3, name: 'Tax Estimator', icon: <BookType/>, link: '/view/tax-estimator'},
        {id: 4, name: 'Reports', icon: <NotebookText/>, link: '/view/reports'},
    ];

    return (
        <aside className='w-64 h-screen bg-white p-2 pt-4 border-r border-gray-200 shadow-sm'>
            <nav className='flex flex-col justify-between h-full'>
                <div className='flex flex-col'>
                    <div className='flex items-center justify-center pb-2 mb-6 shadow-sm'>
                        <h1 className='text-xl font-bold'>TaxPal</h1>
                    </div>
                    <div className='flex flex-col gap-4'>
                        {navItems.map((item)=>(
                            <div key={item.id} className={`flex items-center gap-2 p-2 rounded-md cursor-pointer ${isActive === item.id ? 'bg-blue-500 text-white' : 'bg-transparent text-gray-700 hover:bg-gray-200'}`} onClick={()=> setIsActive(item.id)}>
                                <span >{item.icon}</span>
                                <span className='ml-2'>{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='flex flex-col justify-between'>
                    
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-row items-center gap-2'>
                            <div className='w-full h-full rounded-full overflow-hidden'>
                                <Image
                                    src={'/images/profile.png'}
                                    width={50}
                                    height={50}
                                    alt="Profile"
                                />
                            </div>
                            <div className='flex flex-col'>
                                <span className='ml-2'>John Doe</span>
                                <span className='ml-2 text-gray-500'>john@gmail.com</span>
                            </div>
                        </div>
                        <div className='flex flex-row gap-2'>
                            <button className='w-full bg-gray-200 text-gray-700 py-2 rounded-md mt-4'>Settings</button>
                            <button className='w-full bg-red-500 text-white py-2 rounded-md mt-4'>Logout</button>
                        </div>
                    </div>
                </div>
            </nav>
        </aside>
    )
}

export default SideNavbar
