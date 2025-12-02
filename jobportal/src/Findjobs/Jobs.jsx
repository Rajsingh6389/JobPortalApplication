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

    // small smooth delay
    setTimeout(() => setLoading(false), 700);
  }

  function handleSort(option) {
    setCurrentSort(option);
    let sorted = [...jobs];

    if (option === "Most Recent") {
      sorted.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
    } else if (option === "Salary (Low to High)") {
      sorted.sort(
        (a, b) => parseInt(a.packageAmount) - parseInt(b.packageAmount)
      );
    } else if (option === "Salary (High to Low)") {
      sorted.sort(
        (a, b) => parseInt(b.packageAmount) - parseInt(a.packageAmount)
      );
    } else if (option === "Relevance") {
      sorted = [...allJobsRef.current];
    }

    setJobs(sorted);
  }

  return (
    <div className="p-5">

      <div className="flex justify-between mt-4">
        <div className="text-2xl font-semibold">Recommended Jobs</div>
        <Sort onSortChange={handleSort} />
      </div>

      {/* JOB LIST */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="w-full h-[300px] flex justify-center items-center col-span-3">
            <Loader />
          </div>
        ) : (
          jobs.map((job, i) => (
            <div
              key={job.id}
              className="fade-in"
              style={{ animationDelay: `${i * 80}ms` }} // stagger cards
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
