import React, { useEffect } from "react";
import logo from "../assets/Bentify.png";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import { Link } from "react-router-dom";

const SideBar = ({ recentPlayedTracks }) => {
  useEffect(() => {}, [recentPlayedTracks]);

  return (
    <>
      <div className="p-5 text-xs lg:text-base font-semibold text-[#fff]  bg-[#000] overflow-y-scroll w-full h-screen sm:max-w-[12rem] lg:max-w-[15rem] hidden lg:block pb-36 shadow-2xl">
        <div>
          <img src={logo} alt="" srcset="" />
        </div>
        <div className="mt-4">
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
        <div className="h-[1px] p-0 bg-slate-900" />
      </div>
    </>
  );
};

export default SideBar;
