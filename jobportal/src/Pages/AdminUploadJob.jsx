import React, { useState } from "react";
import axios from "axios";

export default function AdminUploadJob() {
  const [job, setJob] = useState({
    company: "",
    jobTitle: "",
    description: "",
    experience: "",
    jobType: "",
    location: "",
    packageAmount: "",
    applicants: 0,
    postedDaysAgo: 0,
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:8080/jobportal/jobs/admin/upload",
      job,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setLoading(false);
    alert("Job Uploaded Successfully!");

    setJob({
      company: "",
      jobTitle: "",
      description: "",
      experience: "",
      jobType: "",
      location: "",
      packageAmount: "",
      applicants: 0,
      postedDaysAgo: 0,
    });
  };

  return (
    <div className="min-h-screen bg-mine-shaft-950 flex justify-center items-start py-16">
      <div className="w-full max-w-2xl bg-mine-shaft-900 p-10 rounded-2xl shadow-xl border border-mine-shaft-800 animate-[fadeIn_0.4s_ease-out]">
        
        <h1 className="text-3xl font-bold text-bright-sun-300 text-center mb-8">
          Upload a New Job
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Company */}
          <div>
            <label className="text-sm text-gray-300">Company Name</label>
            <input
              value={job.company}
              onChange={(e) => setJob({ ...job, company: e.target.value })}
              className="mt-1 w-full p-3 rounded-lg bg-mine-shaft-800 border border-mine-shaft-700
              focus:ring-2 focus:ring-bright-sun-400 outline-none transition-all duration-200"
              placeholder="Apple, Meta, Netflix..."
              required
            />
          </div>

          {/* Job Title */}
          <div>
            <label className="text-sm text-gray-300">Job Title</label>
            <input
              value={job.jobTitle}
              onChange={(e) => setJob({ ...job, jobTitle: e.target.value })}
              className="mt-1 w-full p-3 rounded-lg bg-mine-shaft-800 border border-mine-shaft-700
              focus:ring-2 focus:ring-bright-sun-400 outline-none transition-all duration-200"
              placeholder="iOS Developer, Product Designer..."
              required
            />
          </div>

          {/* Experience + Job Type */}
          <div className="grid grid-cols-2 gap-6">
            
            <div>
              <label className="text-sm text-gray-300">Experience Level</label>
              <select
                value={job.experience}
                onChange={(e) => setJob({ ...job, experience: e.target.value })}
                className="mt-1 w-full p-3 rounded-lg bg-mine-shaft-800 border border-mine-shaft-700
                focus:ring-2 focus:ring-bright-sun-400 outline-none"
              >
                <option value="">Select</option>
                <option>Entry Level</option>
                <option>Intermediate</option>
                <option>Expert</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-300">Job Type</label>
              <select
                value={job.jobType}
                onChange={(e) => setJob({ ...job, jobType: e.target.value })}
                className="mt-1 w-full p-3 rounded-lg bg-mine-shaft-800 border border-mine-shaft-700
                focus:ring-2 focus:ring-bright-sun-400 outline-none"
              >
                <option value="">Select</option>
                <option>Full-Time</option>
                <option>Part-Time</option>
                <option>Contract</option>
                <option>Internship</option>
              </select>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="text-sm text-gray-300">Location</label>
            <input
              value={job.location}
              onChange={(e) => setJob({ ...job, location: e.target.value })}
              className="mt-1 w-full p-3 rounded-lg bg-mine-shaft-800 border border-mine-shaft-700
              focus:ring-2 focus:ring-bright-sun-400 outline-none"
              placeholder="San Francisco, Remote, Delhi…"
            />
          </div>

          {/* Package Amount */}
          <div>
            <label className="text-sm text-gray-300">Salary / Package</label>
            <input
              value={job.packageAmount}
              onChange={(e) => setJob({ ...job, packageAmount: e.target.value })}
              className="mt-1 w-full p-3 rounded-lg bg-mine-shaft-800 border border-mine-shaft-700
              focus:ring-2 focus:ring-bright-sun-400 outline-none"
              placeholder="₹40 LPA, ₹15–20 LPA…"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm text-gray-300">Job Description</label>
            <textarea
              value={job.description}
              onChange={(e) => setJob({ ...job, description: e.target.value })}
              rows="5"
              className="mt-1 w-full p-3 rounded-lg bg-mine-shaft-800 border border-mine-shaft-700
              focus:ring-2 focus:ring-bright-sun-400 outline-none"
              placeholder="Describe responsibilities, requirements, etc."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-bright-sun-300 text-black font-bold rounded-lg
            transform hover:scale-[1.02] active:scale-[0.98]
            transition-all duration-200 shadow-lg"
          >
            {loading ? "Uploading..." : "Upload Job"}
          </button>
        </form>
      </div>
    </div>
  );
}
