import React from 'react'
import studentimg from '../assets/Student.png'
import { TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { Avatar } from '@mantine/core';
import avatar1 from '../assets/avatar.png'
import avatar2 from '../assets/avatar-2.png'
import avatar3 from '../assets/avatar-3.png'

function Dreamjob() {
    return (
        <div className='flex items-center px-20'>
            <div className='flex flex-col w-[50%] pb-20'>
                <div className='text-6xl font-bold text-mine-shaft-100 [&>span]:text-bright-sun-400'>
                    Find Your <span>Dream</span> <span>Job</span>
                </div>
                <div className='text-mine-shaft-100'>
                    Good life begins with a good job. Start explore thousands of jobs in one place
                </div>
                <div className='flex gap-3 [&_input]:text-mine-shaft-300 pt-20'>
                    <TextInput
                        variant="unstyled"
                        label="Job Title"
                        placeholder="Software Engineer"
                        className='text-mine-shaft-100 px-1 py-2 hover:border-bright-sun-200 border rounded-md border-mine-shaft-300'
                    />
                    <TextInput
                        variant="unstyled"
                        label="Job Type"
                        placeholder="Fulltime"
                        className='text-mine-shaft-100 px-1 py-2  hover:border-bright-sun-200 border rounded-md border-mine-shaft-300'

                    />
                    <button
                        type="button"
                        className="bg-bright-sun-600 rounded-md p-5 h-20 w-20 flex items-center justify-center hover:bg-bright-sun-500 active:scale-95 transition"
                    >
                        <IconSearch className="h-10 w-10 text-white" />
                    </button>

                </div>
            </div>
            <div className='w-[50%] flex justify-center items-center'>
                <div className='w-[22rem]'>
                    <img src={studentimg} alt='' />
                </div>
                <div className='border rounded-md p-2 border-yellow-300'> <Avatar.Group>
                    <Avatar src={avatar1} />
                    <Avatar src={avatar2} />
                    <Avatar src={avatar3} />
                    <Avatar>+5</Avatar>
                </Avatar.Group></div>
            </div>
        </div>
    )
}

export default Dreamjob
