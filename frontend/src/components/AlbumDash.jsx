import axios from "axios";
import React, { useEffect, useState } from "react";

const AlbumDash = ({ albums, loadAlbumTracks }) => {
  const [dashItems, setDashItems] = useState([]);

  const getChartTracks = async () => {
    const { data } = await axios.get(
      "http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=e1c393f9c0cc727b780db859810b26bc&format=json"
    );
    setDashItems(data.tracks.track);
  };
  useEffect(() => {
    if (albums.length < 1) {
      getChartTracks();
    } else {
      setDashItems(albums);
    }
  }, [albums]);

  return (
    <>
      {/* {albums.length ||
      (dashItems.length > 1 && dashItems[0].image.length > 1) ? (
        <h2 className="font-bold md:text-xl py-4 shadow-base">
          {dashItems[0].artist.name && dashItems[0].artist.name} Recommended{" "}
          {albums.length > 1 ? "Albums" : "Tracks"}
        </h2>
      ) : (
        <div></div>
      )} */}

      <div className="relative flex items-center pt-6">
        <div
          id={"slider"}
          className=" h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide "
        >
          {dashItems &&
            dashItems.map((item) => {
              return (
                !Object.values(item.image[3])[0] == "" && (
                  <div
                    key={item.playcount}
                    onClick={() => {
                      loadAlbumTracks(item.artist.name, item.name);
                    }}
                    className="w-[160px] sm:w-[280px] md:w-[240px] shadow-2xl lg:w-[280px] p-1 inline-block relative cursor-pointer "
                  >
                    <img
                      className="w-full h-auto block"
                      src={Object.values(item.image[3])[0]}
                      alt=""
                    />

                    <div className="absolute top-0 left-0 w-full h-full hover:bg-black/20 opacity-0 hover:opacity-100 ">
                      <p className="text-white white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center overflow-hidden break-words	">
                        {item.name}
                      </p>
                    </div>
                  </div>
                )
              );
            })}
        </div>
      </div>
    </>
  );
};

export default AlbumDash;
