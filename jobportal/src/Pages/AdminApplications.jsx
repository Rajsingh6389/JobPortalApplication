import React, { useEffect, useState } from "react";
import axios from "axios";
import { IconMail, IconPhone, IconBriefcase, IconUser, IconDownload } from "@tabler/icons-react";

export default function AdminApplications() {
  const [apps, setApps] = useState([]);
  const [search, setSearch] = useState("");

  const fetchApps = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:8080/jobportal/jobs/admin/applications",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setApps(res.data);
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const filteredApps = apps.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.email.toLowerCase().includes(search.toLowerCase()) ||
    (a.jobTitle && a.jobTitle.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-mine-shaft-950 p-10 text-white">
      {/* HEADER */}
      <h1 className="text-yellow-400 text-3xl mb-6 font-extrabold tracking-wide">
        📄 All Job Applications
      </h1>

      {/* SEARCH BAR */}
      <input
        type="text"
        placeholder="Search by name, email, or job title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 mb-6 rounded-lg bg-mine-shaft-900 border border-mine-shaft-700 
        text-white focus:ring-2 focus:ring-yellow-400 outline-none"
      />

      {/* LIST */}
      <div className="space-y-5">
        {filteredApps.map((a) => (
          <div
            key={a.id}
            className="bg-mine-shaft-900 p-6 rounded-xl border border-mine-shaft-700 shadow-xl
            hover:shadow-yellow-400/20 transition-all hover:scale-[1.01] animate-[fadeIn_0.4s_ease-out]"
          >
            {/* TOP SECTION: USER + JOB */}
            <div className="flex justify-between items-start">

              {/* LEFT: APPLICANT */}
              <div>
                <h2 className="text-xl font-bold text-yellow-300 flex items-center gap-2">
                  <IconUser size={22} /> {a.name}
                </h2>

                <p className="flex items-center gap-2 text-mine-shaft-300 mt-1">
                  <IconMail size={18} /> {a.email}
                </p>

                <p className="flex items-center gap-2 text-mine-shaft-300 mt-1">
                  <IconPhone size={18} /> {a.phone || "Not Provided"}
                </p>
              </div>

              {/* RIGHT: JOB INFO */}
              <div className="text-right">
                <p className="text-mine-shaft-400 text-sm">Applied for:</p>
                <h3 className="text-lg font-semibold text-bright-sun-300 flex items-center justify-end gap-2">
                  <IconBriefcase size={20} /> {a.jobTitle || "Unknown Job"}
                </h3>
                <p className="text-mine-shaft-400 text-xs">Job ID: {a.jobId}</p>
              </div>
            </div>

            {/* RESUME DOWNLOAD */}
            <div className="mt-4">
              <a
                href={a.resume_link} target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-bright-sun-300 
                text-black font-semibold hover:bg-bright-sun-200 transition-all"
              >
                <IconDownload size={20} /> View / Download Resume
              </a>
            </div>

            {/* LINE */}
            <div className="my-4 border-b border-mine-shaft-700"></div>

            {/* ACTIONS (Optional future features) */}
            <div className="flex gap-4">
              <button className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg font-semibold border border-green-500/40 hover:bg-green-500/30">
                Approve
              </button>

              <button className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg font-semibold border border-red-500/40 hover:bg-red-500/30">
                Reject
              </button>

              <button className="px-4 py-2 bg-gray-500/20 text-gray-300 rounded-lg font-semibold border border-gray-500/40 hover:bg-gray-500/30">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredApps.length === 0 && (
        <p className="text-center text-mine-shaft-400 text-lg mt-10">
          No applications found.
        </p>
      )}
    </div>
  );
}
