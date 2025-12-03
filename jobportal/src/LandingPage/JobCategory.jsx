import React from "react";
import { Carousel } from "@mantine/carousel";
import { jobCategory } from "../Data/Data";

function JobCategory() {
  return (
    <section className="mt-16 pb-10 px-4 sm:px-8 md:px-14 lg:px-20">

      {/* HEADER */}
      <h2 className="text-center text-3xl sm:text-4xl font-semibold text-mine-shaft-100 mb-3">
        Browse <span className="text-bright-sun-400">Jobs</span>
      </h2>

      <p className="text-center text-mine-shaft-300 text-base sm:text-lg max-w-2xl mx-auto mb-8">
        Explore diverse job opportunities tailored to your skills — start your career today.
      </p>

      {/* CAROUSEL */}
      <Carousel
        slideSize={{ base: "80%", sm: "50%", md: "33%", lg: "25%" }} // 🔥 RESPONSIVE SIZES
        slideGap="lg"
        align="start"
        loop
        withControls
        className="
          [&_.mantine-Carousel-control]:hover:bg-bright-sun-300
          [&_.mantine-Carousel-control]:focus-visible:bg-bright-sun-400
        "
      >
        {jobCategory.map((category, idx) => (
          <Carousel.Slide key={idx}>
            <div
              className="
                flex flex-col items-center text-center
                bg-mine-shaft-900 border border-mine-shaft-700
                rounded-xl px-6 py-6 min-h-[230px]
                hover:border-bright-sun-300/60
                hover:shadow-[0_0_12px_rgba(255,204,0,0.3)]
                transition-all duration-300
              "
            >
              {/* ICON */}
              <div className="p-4 bg-bright-sun-300 rounded-full mb-3 shadow-md">
                <img
                  className="h-8 w-8 object-contain"
                  src={`/Category/${category.name}.png`}
                  alt={category.name}
                  onError={(e) => (e.target.src = "/Category/default.png")}
                />
              </div>

              {/* TITLE */}
              <h3 className="text-lg sm:text-xl font-semibold text-mine-shaft-200 mb-1">
                {category.name}
              </h3>

              {/* DESC */}
              <p className="text-sm text-mine-shaft-400 mb-2">
                {category.desc}
              </p>

              {/* JOB COUNT */}
              <span className="text-bright-sun-300 font-medium">
                {category.jobs} jobs posted
              </span>
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>
    </section>
  );
}

export default JobCategory;
