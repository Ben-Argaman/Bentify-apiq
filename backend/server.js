const dotenv = require("dotenv");
const cors = require("cors");
const HLSServer = require("hls-server");
const ffmpeg = require("fluent-ffmpeg");

dotenv.config();
const path = require("path");
const express = require("express");
const yts = require("yt-search");
const ytdl = require("ytdl-core");
const fs = require("fs");
const app = express();
app.use(cors());
var http = require("http");

var server = http.createServer();
const hls = new HLSServer(server, {
  path: "/audio",
  dir: "public/audio",
});

app.get("/api/:title", cors(), async (req, res) => {
  const videos = await yt.search(req.params.title);
 res.send(videos[0].id.videoId)

});
server.listen(8000);
app.listen(3000);
