import React from 'react'
import BiaxialBarChart from './BarChart'
import PieChartWithCustomizedLabel from './PieChart'

function Dashboard() {

    const StatusData = [
        {id: 1, title: "Monthly Income", label: "from last month"},
        {id: 2, title: "Monthly Expences", label: "from last month"},
        {id: 3, title: "Estimated Tax Due", label: "from last month"},
        {id: 4, title: "Savings Rate", label: "from last month"},
    ]

    const ButtonLabel =[
        {id: 1, title: "Year"},
        {id: 2, title: "Quater"},
        {id: 3, title: "Month"}
    ]

    return (
        <main className='w-full'>
            <div>
                <section className='flex flex-row items-center justify-between px-2'>
                    {StatusData.map((item)=>(
                        <div
                        className='bg-white text-black border border-gray-300 font-semibold px-2 py-1 w-[20%] rounded-sm shadow-xl'
                        key={item.id}
                        >
                            <h3>{item.title}</h3>
                            <span>300</span>
                            <p>{item.label}</p>
                        </div>
                    ))}
                </section>
                <section className='w-full p-2 gap-4 flex flex-row justify-center'>
                    <div className='w-[70%] bg-white border border-gray-400 rounded-sm shadow-xl p-2'>
                        <div className='flex flex-row justify-between items-center'>
                            <span>Income vs Expenses</span>
                            <div className='flex flex-row gap-2'>
                                {ButtonLabel.map((item)=>(
                                    <button
                                    key={item.id}
                                    >{item.title}</button>
                                ))}
                            </div>
                        </div>
                        <BiaxialBarChart/>
                    </div>
                    <div className='w-[30%] bg-white border border-gray-400 rounded-sm shadow-xl p-2'>
                        <PieChartWithCustomizedLabel/>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Dashboard
