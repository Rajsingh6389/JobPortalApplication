import React from 'react'
import { Carousel } from '@mantine/carousel';
import { jobCategory } from '../Data/Data';

function JobCategory() {
    return (
        <div className='mt-10 pb-5'>
            <div className='text-4xl text-center font-semibold mb-3 text-mine-shaft-100'>
                    Browse <span className='text-bright-sun-400'>Job</span>
            </div>

            <div className='text-lg mx-auto pb-5 text-mine-shaft-300 text-center w-1/2'>
                Explore diverse job opportunities tailored to your skills start your career today
            </div>

            <Carousel slideSize="22%" slideGap="md" withControls loop className='[&_.mantine-Carousel-control]:hover:bg-bright-sun-300
    [&_.mantine-Carousel-control]:focus-visible:bg-bright-sun-400'>
                {jobCategory.map((category, idx) => (
                    <Carousel.Slide key={idx}>
                        <div className="flex flex-col items-center w-64 border rounded-lg pt-5 pb-3 
                                        hover:shadow-bright-sun-300 transition-shadow duration-300">

                            <div className='p-2 bg-bright-sun-300 rounded-full'>
                                <img className='h-8 w-8' src={`/Category/${category.name}.png`} alt='' />
                            </div>

                            <div className='text-mine-shaft-200 text-xl font-semibold'>
                                {category.name}
                            </div>

                            <div className='text-sm text-mine-shaft-300 text-center'>
                                {category.desc}
                            </div>

                            <div className='text-bright-sun-300'>
                                {category.jobs} job posted
                            </div>
                        </div>
                    </Carousel.Slide>
                ))}
            </Carousel>
        </div>
    )
}

export default JobCategory;
