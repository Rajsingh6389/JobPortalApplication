import React from 'react'
import { work } from '../Data/Data'
import avtimg from '../assets/avatar.png'
import { Avatar } from '@mantine/core';


function Working() {
    return (
        <div className='mt-14 pb-5'>
            <div className='text-4xl text-center font-semibold mb-3 text-mine-shaft-100'>
                How <span className='text-bright-sun-400'>it Works</span>
            </div>

            <div className='text-lg mx-auto pb-5 text-mine-shaft-300 text-center w-1/2'>
                Effortlessly navigate through the process and land your dream job
            </div>

            <div className='flex gap-16 px-36  items-start'>

                {/* Left Image */}
                <div className='relative items-center'>
                    <img src='/Working/Girl.png' alt='Job Portal' className='w-[30rem]' />
                    <div className=
                    'text-mine-shaft-100 right-0 top-20  items-center backdrop-blur-md absolute  border p-2 rounded-lg border-bright-sun-200 '>
                        <Avatar src={avtimg} alt="it's me" />
                        <div className='font-medium text-sm'>
                            <div>Complete Your Profile</div>
                            <div className='opacity-50'>70% Completed</div>
                        </div>

                    </div>
                </div>

                {/* Right Side List */}
                <div className='flex flex-col gap-8 pt-10 pl-20'>
                    {
                        work.map((item, index) => {
                            console.log(item.name)

                            return (
                                <div key={index} className='flex items-center gap-4'>
                                    <div className='border rounded-full p-2 bg-bright-sun-300'>
                                        <img
                                            src={`/Working/Apply for job.png`}
                                            alt={item.name}
                                            className="w-10 h-10"
                                        />


                                    </div>
                                    <div className='text-mine-shaft-100'>

                                        <div className='font-semibold text-lg'>{item.name}</div>
                                        <div className='text-mine-shaft-400'>{item.desc}</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default Working
