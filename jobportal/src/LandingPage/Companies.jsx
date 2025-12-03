import React from "react";
import Marquee from "react-fast-marquee";
import { companies } from "../Data/Data";

function Companies() {
  return (
    <div className="mt-16 pb-10 px-4 sm:px-6 md:px-10">
      {/* HEADER */}
      <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold text-mine-shaft-100 mb-10">
        Trusted by <span className="text-bright-sun-400">1000+ Companies</span>
      </h2>

      {/* MARQUEE */}
      <Marquee pauseOnHover={true} speed={50} gradient={false}>
        {companies.map((company, index) => (
          <div
            key={index}
            className="
              flex justify-center items-center
              mx-6 sm:mx-10 
              transition-all duration-300
              hover:scale-[1.08]
              hover:drop-shadow-[0_0_10px_rgba(255,204,0,0.4)]
            "
          >
            <img
              src={`Companies/${company}.png`}
              className="h-10 sm:h-12 md:h-16 object-contain opacity-90 hover:opacity-100 transition"
              alt={company}
              onError={(e) => (e.target.src = "/Companies/default.png")}
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
}

export default Companies;
