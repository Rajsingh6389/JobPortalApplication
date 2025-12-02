import React from "react";
import { IconLock, IconShieldX, IconArrowBackUp } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-mine-shaft-950 flex justify-center items-center px-6 py-10">
      <div
        className="bg-mine-shaft-900 p-10 rounded-2xl shadow-2xl border border-mine-shaft-700
        max-w-lg w-full text-center animate-[fadeIn_0.6s_ease-out]"
      >
        {/* ICON */}
        <div className="flex justify-center mb-6 animate-[bounce_1.2s_ease-in-out]">
          <IconShieldX size={90} className="text-red-500 drop-shadow-lg" />
        </div>

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-red-500 mb-3">
          Access Denied
        </h1>

        {/* MESSAGE */}
        <p className="text-mine-shaft-300 text-lg leading-relaxed">
          You do not have permission to view this page.  
          <span className="text-bright-sun-300 font-semibold"> Admin access </span> is required to continue.
        </p>

        {/* BORDER LINE */}
        <div className="w-2/3 mx-auto my-6 border-b border-mine-shaft-700"></div>

        {/* BUTTONS */}
        <div className="flex flex-col gap-4 mt-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 py-3 rounded-lg
            bg-bright-sun-300 text-black font-semibold hover:bg-bright-sun-200
            transition-all transform hover:scale-[1.03]"
          >
            <IconArrowBackUp size={20} /> Go Back to Home
          </button>

          <button
            onClick={() => navigate("/login")}
            className="py-3 rounded-lg border border-red-500 text-red-400 font-semibold
            hover:bg-red-500/20 transition-all transform hover:scale-[1.03]"
          >
            Login with Admin Account
          </button>
        </div>
      </div>
    </div>
  );
}
