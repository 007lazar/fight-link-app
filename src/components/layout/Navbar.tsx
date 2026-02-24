import logoWhite from "@/assets/Fight Link-logo/vector/default-monochrome-white.svg";
import logoDark from "@/assets/Fight Link-logo/vector/default-monochrome-black.svg";

import { CgDarkMode } from "react-icons/cg";
import { HiMenu } from "react-icons/hi";
import { GoSearch } from "react-icons/go";
import { Link } from "react-router-dom";
import type { Theme } from "@/services/theme";

type NavBarProps = {
  theme: Theme;
  setTheme: (t: Theme) => void;
};
const Navbar = ({ theme, setTheme }: NavBarProps) => {
  const darkMode = theme === "dark";

  return (
    <div
      className={[
        "navbar sticky top-0 z-50 mb-10",
        "backdrop-blur-md border-b border-base-content/10 shadow-sm",
        darkMode ? "bg-black/60 text-white" : "bg-base-100/70 text-base-content",
        "transition-colors duration-300",
      ].join(" ")}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <HiMenu size={30} />
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <Link to="/">
              <li>Home Page</li>
            </Link>
            <Link to="/about">
              <li>About</li>
            </Link>
          </ul>
        </div>
      </div>
      <div className="navbar-center gap-4">
        <Link to="/gyms">
          <button className="btn btn-ghost hover:bg-transparent text-2xl font-bold">Gyms</button>
        </Link>
        <Link className="text-xl" to="/">
          <img
            src={darkMode ? logoWhite : logoDark}
            className="w-40 transition-transform duration-300 hover:scale-105"
            alt="Logo"
          />
        </Link>
        <Link to="/events">
          <button className="btn btn-ghost hover:bg-transparent text-2xl font-bold">Events</button>
        </Link>
      </div>
      <div className="navbar-end">
        <div className="flex flex-row items-center gap-2 mr-7">
          <CgDarkMode size={30} />
          <input
            type="checkbox"
            className="toggle"
            checked={darkMode}
            onChange={() => setTheme(darkMode ? "light" : "dark")}
          />
        </div>
        <button className="btn btn-ghost btn-circle">
          <GoSearch size={20} />
        </button>
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />{" "}
            </svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
