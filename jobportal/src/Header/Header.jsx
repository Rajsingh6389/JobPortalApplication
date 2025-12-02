import { IconRobot, IconSettings, IconBell, IconLogout } from '@tabler/icons-react';
import React from 'react';
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

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="h-24 text-white w-full bg-mine-shaft-950 flex justify-between items-center p-4 shadow-lg">

      {/* LOGO */}
      <div className="flex gap-2 items-center text-bright-sun-400 cursor-pointer"
           onClick={() => navigate("/")}>
        <IconRobot className="h-14 w-10" stroke={2} />
        <div className="text-3xl font-semibold">Jobnest</div>
      </div>

      {/* NAV LINKS */}
      <Navlinks />

      {/* RIGHT SECTION */}
      <div className="flex gap-4 items-center">

        {/* IF NOT LOGGED IN: Show Login / Signup */}
        {!loggedIn && (
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 bg-bright-sun-300 text-black rounded-lg font-semibold hover:bg-bright-sun-200 transition">
              Login
            </button>

            <button
              onClick={() => navigate("/signup")}
              className="px-4 py-2 border border-bright-sun-300 text-bright-sun-300 rounded-lg font-semibold hover:bg-bright-sun-300 hover:text-black transition">
              Sign Up
            </button>
          </div>
        )}

        {/* IF LOGGED IN: Show user info */}
        {loggedIn && (
          <>
            {/* USER NAME + AVATAR */}
            <div className="flex items-center gap-2 cursor-pointer hover:text-bright-sun-300 transition"
                 onClick={() => navigate("/profile")}>
              <div>{user?.name}</div>
              <Avatar src={avtimg} alt="profile" />
            </div>

            {/* SETTINGS */}
            <div className="rounded-full bg-mine-shaft-900 p-1.5 cursor-pointer hover:bg-mine-shaft-800 transition">
              <IconSettings stroke={1.5} />
            </div>

            {/* NOTIFICATIONS */}
            <div className="rounded-full bg-mine-shaft-900 p-1.5 cursor-pointer hover:bg-mine-shaft-800 transition">
              <Indicator color="red" size={8} offset={6} processing>
                <IconBell stroke={1.5} />
              </Indicator>
            </div>

            {/* LOGOUT BUTTON */}
            <div
              onClick={handleLogout}
              className="rounded-full bg-red-500/20 p-1.5 cursor-pointer hover:bg-red-500/30 transition"
              title="Logout"
            >
              <IconLogout stroke={1.5} color="red" />
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default Header;
