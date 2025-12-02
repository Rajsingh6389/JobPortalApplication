import React, { useEffect, useState } from "react";
import { getAllUsersApi } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { Divider, Badge } from "@mantine/core";
import avtimg from "../assets/avatar-3.png";
import Loader from "../Findjobs/Loader";
import { IconUsers, IconMapPin, IconStar } from "@tabler/icons-react";

export default function FindTalent() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await getAllUsersApi();
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
    setTimeout(() => setLoading(false), 900);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center bg-mine-shaft-950 text-white">
        <Loader />
      </div>
    );

  return (
    <div className="min-h-screen bg-mine-shaft-950 text-white px-6 py-12 font-Poppins">

      {/* HEADER */}
      <div className="text-center mb-10 animate-[fadeIn_0.6s_ease]">
        <h1 className="text-4xl font-bold text-bright-sun-300 flex justify-center gap-2 items-center">
          <IconUsers size={40} /> Find Top Talent
        </h1>
        <p className="text-mine-shaft-400 mt-2">
          Explore skilled candidates and view complete profiles instantly.
        </p>
      </div>

      <Divider size="xs" className="mb-10 opacity-40" />

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-[fadeIn_0.8s_ease]">

        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => navigate(`/find-talent/user/${user.id}`)}
            className="
              group bg-mine-shaft-900/70 backdrop-blur-xl 
              border border-mine-shaft-700 
              rounded-2xl p-6 cursor-pointer shadow-lg 
              hover:shadow-bright-sun-300/20 hover:-translate-y-2 
              transition-all duration-300 hover:border-bright-sun-300
            "
          >

            {/* Profile Header */}
            <div className="flex items-center gap-4">
              <img
                src={avtimg}
                className="w-16 h-16 rounded-full border-2 border-bright-sun-300 
                           group-hover:scale-105 transition-transform duration-300"
                alt="profile"
              />

              <div>
                <h2 className="text-xl font-semibold group-hover:text-bright-sun-300 transition">
                  {user.name}
                </h2>

                <p className="text-sm text-mine-shaft-400">{user.role || "No role"}</p>

                <Badge
                  color={user.userType === "ADMIN" ? "red" : "yellow"}
                  variant="light"
                  className="mt-1"
                  size="sm"
                >
                  {user.userType}
                </Badge>
              </div>
            </div>

            {/* Location */}
            <p className="mt-4 flex items-center gap-2 text-mine-shaft-300 text-sm">
              <IconMapPin size={16} /> {user.location || "Location not added"}
            </p>

            {/* Skills */}
            <div className="mt-4 flex flex-wrap gap-2">
              {(user.skills?.split(",") || []).slice(0, 5).map((skill, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs bg-mine-shaft-800 border 
                             border-mine-shaft-700 rounded-lg group-hover:border-bright-sun-300
                             transition-all duration-300"
                >
                  {skill}
                </span>
              ))}

              {user.skills?.split(",").length > 5 && (
                <span className="text-xs text-bright-sun-300">+ more</span>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 text-bright-sun-300 mt-4">
              <IconStar size={18} /> <span className="text-sm">Highly Recommended</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
