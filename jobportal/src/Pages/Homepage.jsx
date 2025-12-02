import React from 'react'
import Dreamjob from '../LandingPage/Dreamjob';
import Companies from '../LandingPage/Companies';
import JobCategory from '../LandingPage/JobCategory';
import Working from '../LandingPage/Working';
import Testinomials from '../LandingPage/Testinomials';
import Subscribe from '../LandingPage/Subscribe';


function Homepage() {
  return (
    <div className='min-h-[100vh] bg-mine-shaft-950 font-["poppins"]'>
      <Dreamjob />
      <Companies />
      <JobCategory />
      <Working />
      <Testinomials/>
      <Subscribe />
    </div>
  )
}

export default Homepage;