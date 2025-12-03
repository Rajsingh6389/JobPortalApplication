import React from "react";
import { Avatar, Rating } from "@mantine/core";
import { testimonials } from "../Data/Data";
import avtimg from "../assets/avatar-3.png";

function Testinomials() {
  return (
    <section className="mt-20 px-4 sm:px-8 md:px-16 lg:px-20 pb-10">

      {/* HEADER */}
      <h2 className="text-3xl sm:text-4xl font-semibold text-center text-mine-shaft-100 mb-10">
        What <span className="text-bright-sun-400">users say</span> about us
      </h2>

      {/* GRID WRAPPER */}
      <div
        className="
          grid 
          grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
          gap-6 sm:gap-8 
        "
      >
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="
              bg-mine-shaft-900 border border-mine-shaft-700 
              rounded-xl p-6 
              hover:border-bright-sun-300/60
              hover:shadow-[0_0_12px_rgba(255,204,0,0.3)]
              transition-all duration-300
            "
          >
            {/* TOP ROW: Avatar + Rating */}
            <div className="flex items-center gap-4 mb-4">
              <Avatar
                src={item.avatar || avtimg}
                alt={item.name}
                className="!h-14 !w-14"
              />
              <div>
                <h3 className="text-lg font-semibold text-mine-shaft-200">
                  {item.name}
                </h3>
                <Rating value={item.rating} fractions={2} readOnly />
              </div>
            </div>

            {/* TESTIMONIAL TEXT */}
            <p className="text-sm text-mine-shaft-300 leading-relaxed">
              {item.testimonial}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testinomials;
