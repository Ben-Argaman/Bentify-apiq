import React from "react";
import logo from "../assets/Bentify.png";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import { Link } from "react-router-dom";
const SideBar = () => {
  return (
    <>
      <div className="p-5 text-xs lg:text-base font-semibold text-[#5c5656]	 border-r border-gray-100 bg-[#fff] overflow-y-scroll w-full h-screen sm:max-w-[12rem] lg:max-w-[15rem] hidden lg:block pb-36 shadow-2xl">
        <img src={logo} alt="" srcset="" />
        <button className="flex items-center space-x-2 p-3  hover:text-[#838383]">
          <HomeIcon />
          <p>Home</p>
        </button>

        <a
          href="/search"
          className="flex items-center space-x-2 p-3 hover:text-[#838383]"
        >
          <SearchIcon />
          <p>Search</p>
        </a>

        <button className="flex items-center space-x-2 p-3 hover:text-[#838383]">
          <LibraryMusicIcon />
          <p>Your Libary</p>
        </button>

        <button className="flex items-center space-x-2 p-3 hover:text-[#838383]">
          <FeaturedPlayListIcon />
          <p>Playlists</p>
        </button>
      </div>
    </>
  );
};

export default SideBar;
