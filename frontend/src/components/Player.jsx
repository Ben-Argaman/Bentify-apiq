import React from "react";

const Player = ({ track, chosenSong, albumImg }) => {
  return (
    track && (
      <div className="h-24 bg-gradient-to-b from-white to-gray-300 pb-8 md:pb-32 pt-4 grid grid-cols-3 text-xs md:text-base px-2 text-gray-500  md:px-8">
        <div className="flex items-center space-x-4">
          <img
            className="hidden md:inline h-24 w-24"
            src={
              track.result
                ? track.result.header_image_thumbnail_url
                : albumImg.image && Object.values(albumImg.image[2])[1]
            }
            alt=""
          />
          <div>
            <h3 className="text-black font-semibold">
              {track.result ? track.result.title : track.name}
            </h3>
            <p>
              {track.result ? track.result.artist_names : track.artist.name}
            </p>
          </div>
        </div>
        <div className="mx-auto my-auto">
          <embed
            id="ytplayer"
            frameBorder="0"
            allowFullScreen="1"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            width="30"
            className="rounded-full object-contain object-center"
            height="30"
            src={`http://www.youtube.com/v/${
              chosenSong && chosenSong
            }?autoplay=1&showinfo=0&modestbranding=1&showinfo=0&fs=0
          `}
          ></embed>
        </div>
      </div>
    )
  );
};

export default Player;
