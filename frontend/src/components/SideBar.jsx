import React, { useEffect } from "react";
import logo from "../assets/Bentify.png";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import { Link } from "react-router-dom";

const SideBar = ({ recentPlayedTracks, albumImg }) => {
  useEffect(() => {}, [recentPlayedTracks]);

  return (
    <>
      <div className="p-5 text-xs lg:text-base font-semibold text-[#fff] border-r border-slate-900 bg-[#000] overflow-y-scroll w-full h-screen sm:max-w-[12rem] lg:max-w-[15rem] hidden lg:block pb-36 shadow-2xl">
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
        <p className="mt-4">Recently Played</p>

        {recentPlayedTracks.map((track, index) => {
          return (
            <div className="grid grid-cols-2 text-gray-500 h-24 p-2 cursor-pointer hover:bg-gray-900 text-sm overflow-hidden">
              <div className="flex items-center space-x-4">
                <p>{index + 1}</p>
                <img
                  src={
                    track.result
                      ? track.result.header_image_thumbnail_url
                      : albumImg && Object.values(albumImg.image[2])[1]
                  }
                  alt=""
                  srcSet=""
                  className="h-10 w-10"
                />
                <div>
                  <p className="w-16 lg:w-12 text-white truncate">
                    {track.result ? track.result.title : track.name}
                  </p>
                  <p className="w-20 h-2">
                    {track.result
                      ? track.result.artist_names
                      : track.artist.name}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SideBar;
