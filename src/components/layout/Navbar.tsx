'use client';

import Image from 'next/image';
import Link from 'next/link';
import { HiMenu } from 'react-icons/hi';

import type { UserSession } from '@/lib/auth';
import { logoutAction } from '@/features/auth/actions/auth';
import logo from '@/assets/gpt_logo.png';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

type NavBarProps = {
  user: UserSession;
};

const Navbar = ({ user }: NavBarProps) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkTheme = mounted ? theme === 'dark' : true;

  return (
    <div
      className="navbar sticky top-0 z-50 mb-10 backdrop-blur-md border-b border-base-content/10 shadow-sm bg-base-100/70 text-base-content transition-colors duration-300"
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
            <Link href="/">
              <li>Home Page</li>
            </Link>
            <Link href="/gyms" className="md:hidden">
              <li>Gyms</li>
            </Link>
            <Link href="/events" className="md:hidden">
              <li>Events</li>
            </Link>
            <Link href="/about">
              <li>About</li>
            </Link>
          </ul>
        </div>
      </div>
      <div className="navbar-center gap-2 md:gap-4">
        <Link href="/gyms" className="hidden md:flex">
          <button className="btn btn-ghost hover:bg-transparent text-xl md:text-2xl font-bold">Gyms</button>
        </Link>
        <Link className="relative w-28 h-10 md:w-40 md:h-14 overflow-hidden flex items-center justify-center" href="/">
          <Image
            src={logo}
            loading="eager"
            className="transition-transform duration-300 hover:scale-105"
            alt="Fight Link Logo"
          />
        </Link>
        <Link href="/events" className="hidden md:flex">
          <button className="btn btn-ghost hover:bg-transparent text-xl md:text-2xl font-bold">Events</button>
        </Link>
      </div>
      <div className="navbar-end gap-4">
        {user ? (
          <form action={logoutAction}>
            <button className="btn btn-neutral" type="submit">Logout</button>
          </form>
        ) : (
          <Link href="/login">
            <button className="btn btn-neutral">Signup</button>
          </Link>
        )}
        <div className="theme-toggle flex flex-row items-center gap-2 mr-7">
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              className="theme-controller"
              checked={!isDarkTheme}
              onChange={() => setTheme(isDarkTheme ? 'light' : 'dark')}
            />
            <svg
              className="swap-off h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            <svg
              className="swap-on h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
