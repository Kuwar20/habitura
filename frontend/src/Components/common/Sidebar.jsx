import React from "react";
import Logowomen from "../../assets/HabituraCropLogo.png";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-darkgreen text-white flex flex-col">
      {/* Logo or Brand */}
      <a href="/">
        <div className="flex justify-center items-center cursor-pointer z-10 space-x-2 px-8 py-3">
          <img
            src={Logowomen}
            alt="Habit & Hustle Logo"
            height={50}
            width={50}
            className="rounded-full"
          />
          <div className="text-4xl text-coolsecondary font-logo font-light">
            Habitura
          </div>
        </div>
      </a>

      {/* Navigation Links */}
      <nav className="flex-1 px-4">
        <ul>
          <li className="py-2">
            <a
              href="/dashboard"
              className="block px-4 py-2 hover:bg-darkestgreen rounded"
            >
              Dashboard
            </a>
          </li>
          <li className="py-2">
            <a
              href="/myHabits"
              className="block px-4 py-2 hover:bg-darkestgreen rounded"
            >
              My Habits
            </a>
          </li>
          <li className="py-2">
            <a
              href="/my-profile"
              className="block px-4 py-2 hover:bg-darkestgreen rounded"
            >
              My Profile
            </a>
          </li>
          <li className="py-2">
            <a
              href="#"
              className="block px-4 py-2 hover:bg-darkestgreen rounded"
            >
              Settings
            </a>
          </li>
          <li className="py-2">
            <a
              href="#"
              className="block px-4 py-2 hover:bg-darkestgreen rounded"
            >
              Logout
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
