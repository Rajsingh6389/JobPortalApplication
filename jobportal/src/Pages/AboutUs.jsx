import React from "react";
import {
  IconUsers,
  IconTarget,
  IconRocket,
  IconBriefcase,
  IconSchool,
} from "@tabler/icons-react";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-mine-shaft-950 text-white px-6 py-16">
      {/* HEADER */}
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-bright-sun-300 mb-4 animate-[fadeIn_0.6s_ease-out]">
          About Our Job Portal
        </h1>
        <p className="text-mine-shaft-300 text-lg leading-relaxed">
          This project is developed as part of our college curriculum by a team
          of dedicated and passionate 3rd-year B.Tech Computer Science students.  
          Our goal is to build a modern, smart, and efficient job portal that bridges  
          the gap between students, professionals, and top companies.
        </p>
      </div>

      {/* STATS SECTION */}
      <div className="max-w-5xl mx-auto mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-mine-shaft-900 p-8 rounded-xl border border-mine-shaft-800 
          text-center hover:shadow-lg hover:scale-[1.03] transition-all duration-300">
          <IconUsers className="mx-auto text-bright-sun-300" size={40} />
          <h2 className="text-3xl font-bold text-white mt-3">10,000+</h2>
          <p className="text-mine-shaft-400">Active Users</p>
        </div>

        <div className="bg-mine-shaft-900 p-8 rounded-xl border border-mine-shaft-800
           text-center hover:shadow-lg hover:scale-[1.03] transition-all duration-300">
          <IconBriefcase className="mx-auto text-bright-sun-300" size={40} />
          <h2 className="text-3xl font-bold text-white mt-3">5000+</h2>
          <p className="text-mine-shaft-400">Jobs Posted</p>
        </div>

        <div className="bg-mine-shaft-900 p-8 rounded-xl border border-mine-shaft-800 
          text-center hover:shadow-lg hover:scale-[1.03] transition-all duration-300">
          <IconRocket className="mx-auto text-bright-sun-300" size={40} />
          <h2 className="text-3xl font-bold text-white mt-3">1200+</h2>
          <p className="text-mine-shaft-400">Companies Hiring</p>
        </div>
      </div>

      {/* MISSION & VISION */}
      <div className="max-w-4xl mx-auto mt-20">
        <div className="bg-mine-shaft-900 p-8 rounded-xl border border-mine-shaft-800 shadow-lg">
          <h2 className="text-2xl font-bold text-bright-sun-300 flex items-center gap-2">
            <IconTarget size={28} /> Our Mission
          </h2>
          <p className="text-mine-shaft-300 mt-3 leading-relaxed">
            To provide an intuitive and reliable platform that helps job seekers 
            find opportunities that match their skills and aspirations.  
            We aim to simplify job hunting for students and professionals.
          </p>

          <h2 className="text-2xl font-bold text-bright-sun-300 mt-8 flex items-center gap-2">
            <IconRocket size={28} /> Our Vision
          </h2>
          <p className="text-mine-shaft-300 mt-3 leading-relaxed">
            To become one of the most innovative and trusted job portals, offering 
            AI-powered recommendations, student-friendly tools, and a seamless hiring flow.
          </p>
        </div>
      </div>

      {/* TEAM SECTION */}
      <div className="max-w-5xl mx-auto mt-20">
        <h2 className="text-3xl font-bold text-bright-sun-300 text-center mb-10 flex justify-center items-center gap-2">
          <IconSchool size={32} /> Meet Our Team
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Raj Singh */}
          <div className="bg-mine-shaft-900 p-6 rounded-xl border border-mine-shaft-800 text-center hover:scale-[1.03] transition-all">
            <h3 className="text-xl font-bold text-white">Raj Singh</h3>
            <p className="text-bright-sun-300 font-semibold">Full Stack Developer</p>
            <p className="text-mine-shaft-400 mt-2">
              Passionate about backend development, Java, Spring Boot, and system design.
              Built the core authentication & backend APIs.
            </p>
          </div>

          {/* Riya Upadhyay */}
          <div className="bg-mine-shaft-900 p-6 rounded-xl border border-mine-shaft-800 text-center hover:scale-[1.03] transition-all">
            <h3 className="text-xl font-bold text-white">Riya Upadhyay</h3>
            <p className="text-bright-sun-300 font-semibold">Frontend Developer</p>
            <p className="text-mine-shaft-400 mt-2">
              Skilled in React, UI/UX and responsive design.  
              Designed an attractive and user-friendly interface for the job portal.
            </p>
          </div>

          {/* Ritesh Singh */}
          <div className="bg-mine-shaft-900 p-6 rounded-xl border border-mine-shaft-800 text-center hover:scale-[1.03] transition-all">
            <h3 className="text-xl font-bold text-white">Ritesh Singh</h3>
            <p className="text-bright-sun-300 font-semibold">Database & API Integration</p>
            <p className="text-mine-shaft-400 mt-2">
              Responsible for database management, API integration, and deployment setup.
              Ensured smooth data flow between UI and backend.
            </p>
          </div>

        </div>

        <p className="text-center text-mine-shaft-400 mt-8 text-lg">
          Together, we are 3rd-year B.Tech students committed to building real-world 
          software solutions and enhancing our development skills.
        </p>
      </div>

      {/* FOOTER */}
      <div className="text-center text-mine-shaft-500 mt-24">
        <p>© {new Date().getFullYear()} Job Portal — Developed by Raj, Riya & Ritesh</p>
      </div>
    </div>
  );
}
