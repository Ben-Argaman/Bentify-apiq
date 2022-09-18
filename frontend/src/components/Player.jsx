import React, { useRef, useState } from "react";
import { VolumeUpIcon as VolumeDownIcon } from "@heroicons/react/outline";
import { VolumeUpIcon } from "@heroicons/react/outline";
import {
  RewindIcon,
  PauseIcon,
  PlayIcon,
  FastForwardIcon,
  ReplyIcon,
  SwitchHorizontalIcon,
} from "@heroicons/react/solid";
import { useEffect } from "react";

const Player = ({ track, isSongClicked, albumImage, source }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const audioPlayer = useRef();
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      audioPlayer.current.play();
    } else {
      audioPlayer.current.pause();
    }
  };
  useEffect(() => {
    isSongClicked && setIsPlaying(true);
  }, [isSongClicked]);

  return (
    track && (
      <div className="mx-auto my-auto">
        <div className="h-36 bg-gradient-to-b from-gray-900 to-black text-white grid grid-cols-3 text-sm md:text-base px-2 md:px-8">
          <div className="flex items-center space-x-4 pb-4">
            <img
              className="hidden md:inline h-20 w-20"
              src={
                track.result
                  ? track.result.header_image_thumbnail_url
                  : albumImage
              }
              alt=""
            />
            <div>
              <h3>{track.result ? track.result.title : track.name}</h3>
              <p className="text-md text-gray-500">
                {track.result ? track.result.artist_names : track.artist.name}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-evenly">
            <SwitchHorizontalIcon className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out" />
            <RewindIcon className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out" />
            {isPlaying ? (
              <PauseIcon
                className="w-10 h-10 cursor-pointer hover:scale-125 transition transform duration-100 ease-out text-[#18D860]"
                onClick={handlePlayPause}
              />
            ) : (
              <PlayIcon
                className="w-10 h-10 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"
                onClick={handlePlayPause}
              />
            )}
            <FastForwardIcon className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out" />
            <ReplyIcon className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out" />
          </div>

          <div className="flex items-center space-x-3 md:space-x-4 justify-end p-5">
            <VolumeDownIcon
              className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"
              // onClick={() => volume > 0 && setVolume(volume - 10)}
            />
            <input
              type="range"
              value={volume}
              onChange={(e) => {
                setVolume(Number(e.target.value));
                audioPlayer.current.volume = volume * 0.01;
              }}
              min={0}
              max={100}
              className="w-14 md:w-36 "
            />
            <VolumeUpIcon
              className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"
              // onClick={() => volume < 100 && setVolume(volume + 10)}
            />
          </div>
        </div>
        <audio
          playsinline
          ref={audioPlayer}
          name="media"
          src={source}
          type="audio/mpeg"
        ></audio>
      </div>
    )
  );
};

export default Player;
