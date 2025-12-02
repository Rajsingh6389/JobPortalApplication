import React from 'react'
import Marquee from "react-fast-marquee";
import { companies } from '../Data/Data';


function Companies() {
    return (
        <div className='mt-10 pb-5'>
            <div className='text-4xl mb-10 text-center font-semibold text-mine-shaft-100 [&>span]:text-bright-sun-400'>Trusted By 1000+ <span>Companies</span></div>
            <Marquee pauseOnHover={true}>
                {
                    companies.map((company,index)=>(
                        <div key={index} className='flex items-center gap-2 cursor-pointer mx-8 px-2 py-1 [&>span]:text-mine-shaft-100 hover:border rounded-lg p-10'>
                            <img src={`Companies/${company}.png`} className='h-16' alt={company} />
                        </div>
                    ))
                }
                
            </Marquee>
        </div>
    )
}

export default Companies
