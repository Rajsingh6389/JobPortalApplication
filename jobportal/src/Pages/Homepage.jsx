import React from "react";
import Dreamjob from "../LandingPage/Dreamjob";
import Companies from "../LandingPage/Companies";
import JobCategory from "../LandingPage/JobCategory";
import Working from "../LandingPage/Working";
import Testinomials from "../LandingPage/Testinomials";
import Subscribe from "../LandingPage/Subscribe";

function Homepage() {
  return (
    <div className='min-h-screen bg-mine-shaft-950 font-["Poppins"]'>

      {/* HERO SECTION */}
      <section className="pt-10 sm:pt-16 lg:pt-20 animate-[fadeIn_0.6s_ease-out]">
        <Dreamjob />
      </section>

      {/* COMPANIES */}
      <section className="mt-10 sm:mt-16 animate-[fadeIn_0.8s_ease-out]">
        <Companies />
      </section>

      {/* JOB CATEGORY */}
      <section className="mt-16 sm:mt-24 px-4 animate-[fadeIn_1s_ease-out]">
        <JobCategory />
      </section>

      {/* HOW IT WORKS */}
      <section className="mt-20 sm:mt-28 px-4 animate-[fadeIn_1.2s_ease-out]">
        <Working />
      </section>

      {/* TESTIMONIALS */}
      <section className="mt-20 sm:mt-28 px-4 animate-[fadeIn_1.4s_ease-out]">
        <Testinomials />
      </section>

      {/* SUBSCRIBE */}
      <section className="mt-24 sm:mt-32 px-4 pb-20 animate-[fadeIn_1.6s_ease-out]">
        <Subscribe />
      </section>

    </div>
  );
}

export default Homepage;
