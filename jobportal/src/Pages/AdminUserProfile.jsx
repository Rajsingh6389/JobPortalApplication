import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import avtimg from "../assets/avatar-3.png";
import {
  IconMail,
  IconUser,
  IconBriefcase,
  IconMapPin,
  IconCurrencyRupee,
  IconIdBadge,
  IconPhone,
  IconBrandLinkedin,
  IconBrandGithub,
  IconFileCv,
  IconDownload,
  IconTimeline,
} from "@tabler/icons-react";
import { Badge, Divider } from "@mantine/core";
import Loader from "../Findjobs/Loader";

export default function AdminUserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      `http://localhost:8080/api/profile/user/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setUser(res.data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user)
    return (
      <div className="h-screen flex justify-center items-center bg-mine-shaft-950">
        <Loader />
      </div>
    );

  return (
    <div className="min-h-screen bg-mine-shaft-950 text-white p-10 flex justify-center animate-[fadeIn_0.6s_ease]">

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ================= LEFT PROFILE PANEL ================= */}
        <div className="lg:col-span-1 bg-mine-shaft-900/80 border border-mine-shaft-700 rounded-2xl shadow-xl p-8 backdrop-blur-xl">

          {/* Profile Picture */}
          <div className="flex justify-center">
            <img
              src={user.img || avtimg}
              className="w-36 h-36 rounded-full border-4 border-bright-sun-300 shadow-2xl"
            />
          </div>

          {/* Name */}
          <h1 className="text-3xl font-bold text-center mt-4 text-bright-sun-300">
            {user.name}
          </h1>

          {/* Email */}
          <div className="flex justify-center mt-2 text-mine-shaft-300 gap-2">
            <IconMail size={18} /> {user.email}
          </div>

          {/* ROLE BADGE */}
          <div className="flex justify-center mt-3">
            <Badge
              size="lg"
              variant="filled"
              color={user.userType === "ADMIN" ? "red" : "yellow"}
              className="shadow-md"
            >
              {user.userType}
            </Badge>
          </div>

          <Divider className="my-6" />

          {/* CONTACT BUTTONS */}
          <div className="space-y-3">
            <button className="w-full flex justify-center items-center gap-2 py-2 bg-mine-shaft-800 rounded-xl hover:bg-mine-shaft-700 border border-bright-sun-300 transition">
              <IconPhone /> Contact
            </button>

            <div className="flex justify-center gap-4 text-bright-sun-300 text-3xl">
              <IconBrandLinkedin className="cursor-pointer hover:scale-110 transition" />
              <IconBrandGithub className="cursor-pointer hover:scale-110 transition" />
            </div>
          </div>

          <Divider className="my-6" />

          {/* QUICK INFO */}
          <div className="space-y-3 text-mine-shaft-300">
            <p>📅 Joined: {user.createdAt?.split("T")[0]}</p>
            <p>🔄 Updated: {user.updatedAt?.split("T")[0]}</p>
          </div>

        </div>

        {/* ================= RIGHT SIDE DETAILS PANEL ================= */}
        <div className="lg:col-span-2 space-y-8">

          {/* ABOUT */}
          <div className="bg-mine-shaft-900/70 p-6 rounded-2xl border border-mine-shaft-700 shadow hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold text-bright-sun-200 flex items-center gap-2">
              <IconUser /> About
            </h2>
            <p className="text-mine-shaft-300 mt-2 text-lg">
              {user.about || "No details available"}
            </p>
          </div>

          {/* JOB PREFERENCES */}
          <div className="bg-mine-shaft-900/70 p-6 rounded-2xl border border-mine-shaft-700 shadow hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold text-bright-sun-200 flex items-center gap-2">
              <IconBriefcase /> Job Preferences
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4 text-mine-shaft-300 text-lg">

              <p className="flex items-center gap-2">
                <IconIdBadge className="text-bright-sun-300" />
                <b>Role:</b> {user.role || "Not added"}
              </p>

              <p className="flex items-center gap-2">
                <IconMapPin className="text-bright-sun-300" />
                <b>Location:</b> {user.location || "Not added"}
              </p>

              <p className="flex items-center gap-2">
                <IconCurrencyRupee className="text-bright-sun-300" />
                <b>Expected Salary:</b> {user.expectedSalary || "Not added"}
              </p>
            </div>
          </div>

          {/* SKILLS */}
          <div className="bg-mine-shaft-900/70 p-6 rounded-2xl border border-mine-shaft-700 shadow hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold text-bright-sun-200">
              Skills
            </h2>

            <div className="flex flex-wrap gap-3 mt-4">
              {(user.skills?.split(",") || []).map((skill, i) => (
                <Badge
                  key={i}
                  size="lg"
                  color="yellow"
                  className="bg-mine-shaft-800 border border-bright-sun-300 text-bright-sun-200 px-4 py-2 shadow-md hover:scale-105 transition"
                >
                  {skill.trim()}
                </Badge>
              ))}
            </div>
          </div>

          {/* RESUME */}
          {user.resume && (
            <div className="bg-mine-shaft-900/70 p-6 rounded-2xl border border-bright-sun-300 shadow-xl hover:shadow-2xl transition">
              <h2 className="text-2xl font-semibold text-bright-sun-200 flex items-center gap-2">
                <IconFileCv /> Resume
              </h2>

              <button
                onClick={() =>
                  window.open(`http://localhost:8080/${user.resume}`, "_blank")
                }
                className="mt-4 flex items-center gap-2 px-5 py-3 bg-bright-sun-300 text-black rounded-xl hover:bg-bright-sun-200 transition font-semibold"
              >
                <IconDownload /> View / Download Resume
              </button>
            </div>
          )}

          {/* TIMELINE */}
          <div className="bg-mine-shaft-900/70 p-6 rounded-2xl border border-mine-shaft-700 shadow hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold text-bright-sun-200 flex items-center gap-2">
              <IconTimeline /> Activity Timeline
            </h2>

            <ul className="mt-4 space-y-3 text-mine-shaft-300 text-lg">
              <li>📌 Profile Created — {user.createdAt?.split("T")[0]}</li>
              <li>📌 Last Updated — {user.updatedAt?.split("T")[0]}</li>
              <li>📌 Account Type — {user.userType}</li>
            </ul>
          </div>

        </div>
      </div>

    </div>
  );
}
