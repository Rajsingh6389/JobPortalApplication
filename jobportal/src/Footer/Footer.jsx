import React from "react";
import { IconRobot } from "@tabler/icons-react";

function Footer() {
  return (
    <footer className="bg-mine-shaft-950 text-gray-300 font-[Poppins] pt-16 pb-8 px-6">
      
      {/* ---- TOP: LOGO ---- */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-3 text-bright-sun-400">
          <IconRobot className="h-12 w-10" stroke={2} />
          <span className="text-3xl font-semibold tracking-wide">JobNest</span>
        </div>
      </div>

      <hr className="border-gray-700/60 max-w-4xl mx-auto mb-8" />

      {/* ---- MIDDLE LINKS ---- */}
      <div className="
        flex flex-col sm:flex-row 
        justify-center items-center 
        gap-4 sm:gap-10 
        text-sm text-gray-400
      ">
        <a className="hover:text-bright-sun-300 transition" href="/find-jobs">Find Jobs</a>
        <a className="hover:text-bright-sun-300 transition" href="/companies">Companies</a>
        <a className="hover:text-bright-sun-300 transition" href="/about">About Us</a>
        <a className="hover:text-bright-sun-300 transition" href="/contact">Contact</a>
      </div>

      {/* ---- CREDITS ---- */}
      <div className="text-center mt-10 text-gray-400">
        Developed By{" "}
        <span className="text-bright-sun-300 font-medium">Raj</span>,{" "}
        <span className="text-bright-sun-300 font-medium">Riya</span> and{" "}
        <span className="text-bright-sun-300 font-medium">Ritesh</span>
      </div>

      {/* ---- COPYRIGHT ---- */}
      <div className="text-center text-xs mt-4 text-gray-500">
        © {new Date().getFullYear()} JobNest. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;
