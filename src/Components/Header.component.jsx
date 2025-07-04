import { useState } from "react";
import { getUsername } from "../Utils/Localstorage.jsx";
import { MdOutlineDashboard, MdOutlineCreateNewFolder } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const Username = getUsername();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navItems = [
    {
      label: "Dashboard",
      icon: <MdOutlineDashboard />,
      path: "/",
      onClick: () => navigate("/"),
    },
    {
      label: "Manage Tasks",
      icon: <FaTasks />,
      path: "/manageTasks",
      onClick: () => navigate("/manageTasks"),
    },
    {
      label: "Create Task",
      icon: <MdOutlineCreateNewFolder />,
      path: "/createTask",
      onClick: () => navigate("/createTask"),
    },
  ];

  return (
    <div> 
      <div className="h-20 pl-4 md:pl-10 border-b-2 border-zinc-100 flex items-center justify-between md:justify-start">
      
        <button
          className="md:hidden"
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        >
          <HiOutlineMenuAlt3 className="text-2xl" />
        </button>
        <p className="text-2xl font-bold flex-1 text-center md:text-left md:flex-none">
          Task Manager
        </p>
      </div>

      <div className="hidden md:flex flex-col gap-5 pt-5 w-[15vw] border-r-2 h-[100vh] border-zinc-100 items-center float-left">
        <CgProfile className="w-20 h-20" />
        <p className="bg-blue-600 text-white w-20 rounded-xl px-1 text-center">
          {Username}
        </p>

        <div className="flex flex-col gap-7 mt-10 w-full">
          {navItems.map(({ label, icon, path, onClick }) => (
            <div
              key={label}
              onClick={onClick}
              className={`hover:cursor-pointer flex gap-3 items-center p-3 border-r-4 ${
                isActive(path)
                  ? "border-blue-500 bg-blue-50 text-blue-600 font-semibold"
                  : "border-transparent"
              }`}
            >
              {icon}
              <p className="font-semibold">{label}</p>
            </div>
          ))}
        </div>
      </div>

      
      <div
        className={`md:hidden fixed top-20 left-0 h-full w-[70vw] bg-white border-r border-zinc-200 z-50 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center pt-5">
          <CgProfile className="w-16 h-16" />
          <p className="bg-blue-600 text-white rounded-xl px-3 mt-2">
            {Username}
          </p>
        </div>

        <div className="flex flex-col mt-10">
          {navItems.map(({ label, icon, path, onClick }) => (
            <div
              key={label}
              onClick={() => {
                onClick();
                setSidebarOpen(false);
              }}
              className={`flex items-center gap-3 p-3 pl-6 border-r-4 cursor-pointer ${
                isActive(path)
                  ? "border-blue-500 bg-blue-50 text-blue-600 font-semibold"
                  : "border-transparent hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              {icon}
              <span className="font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
