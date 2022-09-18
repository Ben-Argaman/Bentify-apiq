import * as yt from "youtube-search-without-api-key";
import path from "path";
import * as dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import express from "express";
import ytdl from "ytdl-core";
import fs from "fs";

const app = express();
app.use(cors());
const __dirname = path.resolve();

app.get("/api/:title", cors(), async (req, res) => {
  const videos = await yt.search(req.params.title);
  const download = ytdl(
    `https://www.youtube.com/watch?v=${videos[0].id.videoId}`,
    { filter: "audioonly" }
  );
  var videoWritableStream = fs.createWriteStream(
    __dirname + "/backend/data/" + videos[0].id.videoId + ".mp3"
  );
  let stream = download.pipe(videoWritableStream);

  stream.on("finish", () => {
    const videoPath =
      __dirname + "/backend/data/" + videos[0].id.videoId + ".mp3";
    const videoSize = fs.statSync(
      __dirname + "/backend/data/" + videos[0].id.videoId + ".mp3"
    ).size;
    let range = req.headers.range;
    if (!range) range = "bytes=0-";

    // Parse Range
    // Example: "bytes=32324-"
    const CHUNK_SIZE = 10 ** 100; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

    // Create headers
    const contentLength = end - start + 1;
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "audio/mp3",
    };

    // HTTP Status 206 for Partial Content
    res.writeHead(206, headers);

    // create video read stream for this particular chunk
    const videoStream = fs.createReadStream(videoPath, { start, end });

    // Stream the video chunk to the client
    videoStream.pipe(res);
  });
});
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
}
app.listen(
  process.env.PORT || 5002,
  console.log("server running on port 5002")
);
