import React, { useState, useEffect, useRef } from "react";
import Sort from "./Sort";
import { getAllJobs } from "../api/JobApi";
import Jobcard from "./Jobcard";
import Loader from "./Loader";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const allJobsRef = useRef([]);
  const [currentSort, setCurrentSort] = useState("Relevance");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJobs();
  }, []);

  async function loadJobs() {
    setLoading(true);
    try {
      const res = await getAllJobs();
      allJobsRef.current = res.data || [];
      setJobs(allJobsRef.current);
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => setLoading(false), 700);
  }

  function handleSort(option) {
    setCurrentSort(option);
    let sorted = [...jobs];

    if (option === "Most Recent") {
      sorted.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
    } else if (option === "Salary (Low to High)") {
      sorted.sort((a, b) => parseInt(a.packageAmount) - parseInt(b.packageAmount));
    } else if (option === "Salary (High to Low)") {
      sorted.sort((a, b) => parseInt(b.packageAmount) - parseInt(a.packageAmount));
    } else if (option === "Relevance") {
      sorted = [...allJobsRef.current];
    }

    setJobs(sorted);
  }

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-16 py-6">

      {/* TOP BAR */}
      <div className="
        flex flex-col sm:flex-row 
        justify-between sm:items-center 
        gap-3 sm:gap-0 mt-3
      ">
        <h1 className="text-xl sm:text-2xl font-semibold text-white">
          Recommended Jobs
        </h1>

        <Sort onSortChange={handleSort} />
      </div>

      {/* JOB LIST GRID */}
      <div
        className="
          mt-6 
          grid grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          xl:grid-cols-4
          gap-5 sm:gap-6 lg:gap-7
        "
      >
        {loading ? (
          <div className="w-full col-span-4 flex justify-center py-16">
            <Loader />
          </div>
        ) : (
          jobs.map((job, i) => (
            <div
              key={job.id}
              className="fade-in"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <Jobcard data={job} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Jobs;
