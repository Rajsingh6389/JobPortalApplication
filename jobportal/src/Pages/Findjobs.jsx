import React from "react";
import Jobs from "../Findjobs/Jobs";

function Findjobs() {
  return (
    <div className='min-h-screen bg-mine-shaft-950 font-["Poppins"]'>

      {/* PAGE HEADER / HERO SECTION */}
      <div className="w-full py-16 px-6 sm:px-12 lg:px-20 bg-mine-shaft-900 border-b border-mine-shaft-800 shadow-md">
        <h1 className="text-4xl sm:text-5xl font-bold text-bright-sun-300">
          Find Your Next Job
        </h1>

        <p className="text-mine-shaft-300 text-lg mt-3 max-w-2xl">
          Explore thousands of opportunities tailored to your skills, goals, and experience.
        </p>
      </div>

      {/* JOB LIST SECTION */}
      <div className="mt-8 px-4 sm:px-8 lg:px-16 pb-16">
        <Jobs />
      </div>
    </div>
  );
}

export default Findjobs;
