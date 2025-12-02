import { Avatar } from '@mantine/core'
import React from 'react'
import avtimg from '../assets/avatar-3.png'
import { Rating } from '@mantine/core';
import { testimonials } from '../Data/Data';

function Testinomials() {
    return (
        <div className='mt-10 pb-5'>
            <div className='text-4xl text-center font-semibold mb-3 text-mine-shaft-100'>
                What <span className='text-bright-sun-400'>users says about us...</span>
            </div>
            <div>
                <div className='text-mine-shaft-100 flex justify-evenly items-center gap-3 '>


                    {
                        testimonials.map((item, index) => {
                            return (
                                <div
                                  key={index}
                                  className="border rounded-lg p-2 w-[15rem] transition-all duration-300
                                  hover:border-bright-sun-200 hover:shadow-bright-sun-300">                                
                                  <div className="flex items-center gap-2">
                                    <Avatar className="!h-14 !w-14" src={avtimg} alt="it's me" />
                                    <div>
                                      <div className="text-lg font-bold">{item.name}</div>
                                      <Rating value={item.rating} fractions={2} readOnly />
                                    </div>
                                  </div>
                              
                                  <div className="text-sm text-mine-shaft-300 break-words line-clamp-3">
                                    {item.testimonial}
                                  </div>
                                </div>
                              );
                              

                        })
                    }

                </div>
            </div>
        </div>
    )
}

export default Testinomials
