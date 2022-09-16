import React, { useEffect } from "react";

const Song = ({ track, index, albumImg }) => {
  useEffect(() => {}, [track]);

  return (
    <>
      <div className="grid grid-cols-2 text-gray-500 h-24 p-2 cursor-pointer hover:bg-gray-900 text-lg">
        <div className="flex items-center space-x-4">
          <p>{index + 1}</p>
          <img
            src={
              track.result
                ? track.result.header_image_thumbnail_url
                : Object.values(albumImg.image[2])[1]
            }
            alt=""
            srcSet=""
            className="h-20 w-20"
          />
          <div>
            <p className="w-36 lg:w-64 truncate text-white">
              {track.result ? track.result.title : track.name}
            </p>
            <p className="w-40 truncate">
              {track.result ? track.result.artist_names : track.artist.name}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between ml-auto md:ml-0">
          <p className="w-40 hidden md:inline">
            {track.albumName ? track.albumName : albumImg && albumImg.name}
          </p>
        </div>
      </div>
    </>
  );
};

export default Song;
