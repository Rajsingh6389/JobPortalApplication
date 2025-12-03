import { IconRobot, IconSettings, IconBell, IconLogout, IconMenu2, IconX } from '@tabler/icons-react';
import React, { useState } from 'react';
import { Avatar, Indicator } from '@mantine/core';
import avtimg from '../assets/avatar-3.png';
import Navlinks from './Navlinks';
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

function Header() {
  const { user, loggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false); // MOBILE NAV STATE

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="bg-mine-shaft-950 text-white h-20 w-full px-4 sm:px-8 shadow-lg flex items-center justify-between font-[Poppins] sticky top-0 z-50">

      {/* LOGO */}
      <div
        className="flex items-center gap-2 text-bright-sun-400 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <IconRobot className="h-12 w-10" stroke={2} />
        <span className="text-2xl sm:text-3xl font-semibold">JobNest</span>
      </div>

      {/* DESKTOP NAV */}
      <div className="hidden lg:block">
        <Navlinks />
      </div>

      {/* RIGHT SECTION */}
      <div className="hidden sm:flex gap-4 items-center">

        {!loggedIn && (
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 bg-bright-sun-300 text-black rounded-lg font-semibold hover:bg-bright-sun-200 transition"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/signup")}
              className="px-4 py-2 border border-bright-sun-300 text-bright-sun-300 rounded-lg font-semibold 
                         hover:bg-bright-sun-300 hover:text-black transition"
            >
              Sign Up
            </button>
          </div>
        )}

        {loggedIn && (
          <>
            <div
              className="flex items-center gap-2 cursor-pointer hover:text-bright-sun-300 transition"
              onClick={() => navigate("/profile")}
            >
              <span className="hidden md:block">{user?.name}</span>
              <Avatar src={avtimg} alt="profile" size="md" />
            </div>

            <div className="icon-btn">
              <IconSettings stroke={1.5} />
            </div>

            <div className="icon-btn">
              <Indicator color="red" size={8} offset={6} processing>
                <IconBell stroke={1.5} />
              </Indicator>
            </div>

            <div
              onClick={handleLogout}
              className="p-2 rounded-full bg-red-500/20 hover:bg-red-500/30 cursor-pointer transition"
            >
              <IconLogout stroke={1.5} color="red" />
            </div>
          </>
        )}
      </div>

      {/* MOBILE MENU BUTTON */}
      <button
        className="lg:hidden sm:hidden flex text-white"
        onClick={() => setOpen(!open)}
      >
        {open ? <IconX size={30} /> : <IconMenu2 size={30} />}
      </button>

      {/* MOBILE DROPDOWN NAV */}
      {open && (
        <div
          className="
            absolute top-20 left-0 w-full bg-mine-shaft-900 
            border-t border-mine-shaft-800
            flex flex-col gap-5 py-6 px-6 lg:hidden sm:hidden
            animate-slide-down
          "
        >
          <Navlinks mobile />

          {!loggedIn && (
            <div className="flex flex-col gap-3 mt-4">
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 bg-bright-sun-300 text-black rounded-md font-semibold"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="px-4 py-2 border border-bright-sun-300 text-bright-sun-300 rounded-md"
              >
                Sign Up
              </button>
            </div>
          )}

          {loggedIn && (
            <div className="flex flex-col gap-4 mt-6">
              <button
                onClick={() => navigate("/profile")}
                className="flex items-center gap-3 text-bright-sun-300"
              >
                <Avatar src={avtimg} />
                <span>{user?.name}</span>
              </button>

              <button
                className="flex items-center gap-3 text-red-400"
                onClick={handleLogout}
              >
                <IconLogout /> Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
