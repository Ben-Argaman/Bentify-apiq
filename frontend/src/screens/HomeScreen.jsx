import React from "react";
import { useState } from "react";
import axios from "axios";
import Song from "../components/Song";
import { useEffect } from "react";
import AlbumDash from "../components/AlbumDash";
import Player from "../components/Player";
import Slider from "react-slick";
import SideBar from "../components/SideBar";

const HomeScreen = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [chosenSong, setChosenSong] = useState("");
  const [chosenTrack, setChosenTrack] = useState("");
  const [artistAlbums, setArtistAlbums] = useState([]);
  const [trackHistory, setTrackHistory] = useState([]);
  const token =
    "HzD3tlJ238gNcFQnrToIEqUXAiqy8mSroJcl3G_lEG-PA_2AX5h-qvSm4wAMb0ef";

  const getSong = async () => {
    const { data } = await axios.get(
      `https://api.genius.com/search?q=${searchKey}&access_token=${token}`
    );
    if (!searchKey == "") {
      setSearchResults(data);
    }
  };

  const getSongId = async (query) => {
    const { data } = await axios.get(
      `https://ba-music.herokuapp.com/api/${query}`
    );
    setChosenSong(data);
  };

  const getArtistAlbums = async (artist) => {
    const { data } = await axios.get(
      `http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${artist}&api_key=e1c393f9c0cc727b780db859810b26bc&format=json`
    );
    setArtistAlbums(data.topalbums ? data.topalbums.album : "");
  };
  const loadAlbumTracks = async (artist, album) => {
    const { data } = await axios.get(
      `http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=e1c393f9c0cc727b780db859810b26bc&artist=${artist}&album=${album}&format=json`
    );
    data.album.tracks.track.length > 2 && setSearchResults(data.album);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getSong();
    }, 200);
    return () => clearTimeout(delayDebounceFn);
  }, [searchKey]);

  return (
    <>
      <SideBar recentPlayedTracks={trackHistory} albumImg={searchResults} />
      <div className="flex-grow mt-5 ml-auto overflow-y-scroll h-screen">
        <div className="absolute lg:left-auto">
          <div className="relative w-full max-w-3xl px-6 z-50">
            <div className="absolute h-10 mt-1 left-0 top-0 flex items-center pl-10">
              <svg
                className="h-4 w-4 fill-current text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
              </svg>
            </div>

            <input
              id="search-toggle"
              type="search"
              placeholder="search"
              className="block w-full bg-gray-200 focus:outline-none focus:bg-white focus:shadow-md text-gray-700 font-bold rounded-full pl-12 pr-4 py-3"
              onChange={(e) => setSearchKey(e.target.value)}
            />
          </div>
        </div>
        <header className="absolute right-8">
          {" "}
          <div className="flex items-center space-x-3 opacity-90 hover:bg-gray-100 cursor-pointer p-1 pr-2 rounded-full">
            <img
              src="https://as2.ftcdn.net/v2/jpg/03/32/59/65/1000_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg"
              alt=""
              className="rounded-full w-10 h-10"
            />
            <h2 className="hidden lg:block">ben argaman</h2>
          </div>
        </header>{" "}
        <div className="pt-16 px-2 md:px-0 md:mx-14 lg:mx-16 space-y-1 shadow-xl">
          {artistAlbums.length > 1 && (
            <AlbumDash
              albums={artistAlbums}
              loadAlbumTracks={loadAlbumTracks}
            />
          )}
        </div>
        <div className="lg:px-8 px-2 flex flex-col w-full pt-6 h-auto">
          {searchResults.response
            ? searchResults.response.hits.map((track, index) => {
                return (
                  <div
                    className="border-b-1 border-slate-900 "
                    key={index}
                    onClick={() => {
                      setChosenTrack(track);
                      {
                        !trackHistory.includes(track) &&
                          setTrackHistory((prev) => [...prev, track]);
                      }

                      getSongId(
                        track.result
                          ? `${track.result.title} ${track.result.primary_artist.name}`
                          : track.name
                      );
                      getArtistAlbums(track.result.primary_artist.name);
                    }}
                  >
                    <Song track={track} index={index} />
                  </div>
                );
              })
            : searchResults.tracks &&
              searchResults.tracks.track.length > 1 &&
              searchResults.tracks.track.map((track, index) => {
                return (
                  <div
                    key={index}
                    className="border-b-1 border-slate-900 "
                    onClick={() => {
                      {
                        !trackHistory.includes(track) &&
                          setTrackHistory((prev) => [...prev, track]);
                      }
                      getSongId(track && `${track.name} ${track.artist.name}`);
                      setChosenTrack(track);
                    }}
                  >
                    <Song
                      track={track}
                      index={index}
                      albumImg={searchResults}
                    />
                  </div>
                );
              })}
        </div>
        <div className="sticky bottom-0 ">
          <Player
            track={chosenTrack}
            chosenSong={chosenSong}
            albumImg={searchResults}
          />
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
