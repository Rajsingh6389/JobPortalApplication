import React from "react";
import { TextInput, Button } from "@mantine/core";

function Subscribe() {
  return (
    <section
      className="
        bg-mine-shaft-900 
        mt-20 mx-4 sm:mx-10 md:mx-20 
        rounded-xl 
        py-10 px-6 
        flex flex-col items-center 
        text-center gap-6
      "
    >
      {/* Heading */}
      <h2
        className="
          text-2xl sm:text-3xl md:text-4xl 
          font-semibold text-mine-shaft-100
        "
      >
        Never miss <span className="text-bright-sun-400">Job News</span>
      </h2>

      {/* SUBTEXT */}
      <p className="text-mine-shaft-300 max-w-xl text-sm sm:text-base">
        Subscribe now to get the latest job updates, hiring alerts, and career resources
        delivered straight to your inbox.
      </p>

      {/* Input + Button */}
      <div
        className="
          flex flex-col sm:flex-row 
          items-center 
          w-full max-w-xl 
          gap-3 sm:gap-0 
          border border-mine-shaft-700 
          rounded-lg overflow-hidden
          bg-mine-shaft-800
        "
      >
        <TextInput
          variant="unstyled"
          placeholder="your@email.com"
          className="
            flex-1 px-4 py-3 text-white 
            placeholder-gray-400 text-sm sm:text-base
          "
        />

        <Button
          color="yellow"
          variant="filled"
          className="
            w-full sm:w-auto 
            h-full px-6 py-3 
            text-black font-semibold 
            hover:bg-bright-sun-300 
            transition-all
          "
        >
          Subscribe
        </Button>
      </div>
    </section>
  );
}

export default Subscribe;
