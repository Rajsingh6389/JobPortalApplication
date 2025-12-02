import React from "react";
import { IconRobot } from "@tabler/icons-react";

function Footer() {
  return (
    <div className="pt-20 text-center space-y-3 bg-mine-shaft-950 font-[Poppins]">

      {/* Logo & Title */}
      <div className="flex justify-center items-center">
        <div className="flex gap-2 items-center text-bright-sun-400">
          <IconRobot className="h-14 w-10" stroke={2} />
          <div className="text-3xl font-semibold">Jobnest</div>
        </div>
      </div>
      <hr className="border-t border-gray-700 w-full mx-auto my-4" />

      <div className="[&_span]:text-bright-sun-200 text-gray-300">
        Developed By Raj <span>Riya</span> and Ritesh
      </div>

    </div>
  );
}

export default Footer;
