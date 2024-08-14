"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MdSearch, MdAccountCircle } from 'react-icons/md';
import { IoNotificationsOutline } from 'react-icons/io5';
import Link from 'next/link';

const Navbar = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [navbarBgColor, setNavbarBgColor] = useState("transparent");
  const [token, setToken] = useState(null);
  const [screenId, setScreenId] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);

      // Change background color based on scroll position
      const maxScroll = 200; // Adjust as needed
      const scrollPercentage = Math.min(position / maxScroll, 1);
      const newColor = `rgba(0, 0, 0, ${scrollPercentage})`;
      setNavbarBgColor(newColor);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Access localStorage only after the component has mounted
    const storedData = JSON.parse(localStorage.getItem('data'));
    if (storedData) {
      setToken(storedData.token);
      setScreenId(storedData.screenId);
    }
  }, []);

  return (
    <nav className="fixed -top-3 left-0 right-0 flex items-center pl-6 justify-between p-2 z-30"
      style={{ backgroundColor: navbarBgColor }}>
      <div className="flex items-center space-x-6">
        <Image src="/netflixLogo.png" alt="Netflix Logo" width={112} height={32} />
        <ul className="hidden md:flex space-x-6 font-sans font-medium text-white">
          <li>
            <Link href={{
              pathname: "/browse",
              query: { token, screenId }
            }}>
              Home
            </Link>
          </li>
          <li>
            <Link href={{
              pathname: "/tvShows",
              query: { token, screenId }
            }}>
              Tv Shows
            </Link>
          </li>
          <li>
            <Link href={{
              pathname: "/movies",
              query: { token, screenId }
            }}>
              Movies
            </Link>
          </li>
          <li>New & Popular</li>
          <li>
            <Link href={{
              pathname: "/myList",
              query: { token, screenId }
            }}>
              My List
            </Link>
          </li>
          <li>Browse by Languages</li>
        </ul>
      </div>
      <div className="flex justify-center items-center space-x-10 pr-20 ">
        <MdSearch className="text-white text-3xl cursor-pointer" />
        <IoNotificationsOutline className="text-white text-3xl cursor-pointer" />
        <Link href={'/screens'}><img
          className="w-10 rounded"
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt="user"
        /></Link>
      </div>
    </nav>
  );
};

export default Navbar;
