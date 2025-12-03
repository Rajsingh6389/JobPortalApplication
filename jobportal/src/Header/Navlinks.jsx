import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navlinks({ mobile = false }) {
  const links = [
    { name: "Find Jobs", url: "/find-jobs" },
    { name: "Find Talent", url: "/find-talent" },
    { name: "Upload Job", url: "/upload-job" },
    { name: "View Applications", url: "/applications" },
    { name: "About Us", url: "/about" },
    { name: "AI Resume", url: "/resume-generator" },
  ];

  const location = useLocation();

  return (
    <nav
      className={
        mobile
          ? "flex flex-col gap-4 text-gray-300"
          : "flex gap-6 items-center text-mine-shaft-300"
      }
    >
      {links.map((link) => {
        const isActive = location.pathname === link.url;

        return (
          <Link
            key={link.url}
            to={link.url}
            className={`
              relative font-medium transition-all 
              ${mobile ? "text-lg" : "text-sm"}
              ${isActive ? "text-bright-sun-300" : "hover:text-bright-sun-300"}
            `}
          >
            {/* TEXT */}
            {link.name}

            {/* UNDERLINE EFFECT */}
            <span
              className={`
                absolute left-0 bottom-[-4px] h-[2px] bg-bright-sun-300 rounded-full transition-all 
                ${isActive ? "w-full" : "w-0 group-hover:w-full"}
              `}
            ></span>
          </Link>
        );
      })}
    </nav>
  );
}

export default Navlinks;
