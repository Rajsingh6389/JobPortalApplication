import React from 'react'
import { TextInput } from '@mantine/core';
import { Button } from '@mantine/core';


function Subscribe() {
    return (

        <div className='mt-20 flex bg-mine-shaft-900 mx-20 py-3 rounded-xl  justify-center'>
            <div className='text-4xl w-2/5 text-center font-semibold mb-3 text-mine-shaft-100'>
                Never Wants to miss <span className='text-bright-sun-400'>Job news</span>
            </div>
            <div className="flex items-center border rounded-md h-[2.4rem] w-[30rem] pl-3 pr-0 overflow-hidden">
                <TextInput
                    className="text-slate-100 flex-1"
                    variant="unstyled"
                    placeholder="Your@gmail.com"
                />

                <Button
                    color="yellow"
                    variant="filled"
                    className="h-full rounded-l-none px-4"
                >
                    Button
                </Button>
            </div>


        </div>
    )
}

export default Subscribe
