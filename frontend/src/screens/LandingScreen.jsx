import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

const LandingScreen = () => {
  const [topAlbums, setTopAlbums] = useState([]);

  useEffect(() => {
    getBillboard();
  }, []);

  const getBillboard = async () => {
    const { data } = await axios.get(
      "http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=e1c393f9c0cc727b780db859810b26bc&format=json"
    );
    data.tracks.track.map((track) => {
      getBillboardAlbums(track.artist.name, track.name);
    });
  };

  const getBillboardAlbums = async (artist, trackName) => {
    const { data } = await axios.get(
      `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=e1c393f9c0cc727b780db859810b26bc&artist=${artist}&track=${trackName}&format=json`
    );

    setTopAlbums((prev) => [
      ...prev,
      data.track.album && Object.values(data.track.album.image[3])[0],
    ]);
  };

  return (
    <div className="flex-grow mt-5 h-screen ml-auto overflow-y-scroll">
      <div className="pt-16 py-auto mx-16 space-y-1 ">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          {topAlbums.length > 0 &&
            topAlbums.map(
              (album) =>
                album != undefined && (
                  <div className=" ">
                    <img
                      className="w-full h-auto block object-contain"
                      src={album}
                    />
                  </div>
                )
            )}
        </div>
      </div>
    </div>
  );
};

export default LandingScreen;
