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
    const path = __dirname + "/backend/data/" + videos[0].id.videoId + ".mp3";

    var stat = fs.statSync(path);
    var total = stat.size;

    if (req.headers.range) {
      // meaning client (browser) has moved the forward/back slider
      // which has sent this request back to this server logic ... cool
      var range = req.headers.range;
      var parts = range.replace(/bytes=/, "").split("-");
      var partialstart = parts[0];
      var partialend = parts[1];

      var start = parseInt(partialstart, 10);
      var end = partialend ? parseInt(partialend, 10) : total - 1;
      var chunksize = end - start + 1;
      console.log("RANGE: " + start + " - " + end + " = " + chunksize);

      var file = fs.createReadStream(path, { start: start, end: end });
      res.writeHead(206, {
        "Content-Range": "bytes " + start + "-" + end + "/" + total,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "audio/mpeg",
      });
      file.pipe(res);
    } else {
      console.log("ALL: " + total);
      res.writeHead(200, {
        "Content-Length": total,
        "Content-Type": "audio/mpeg",
      });
      fs.createReadStream(path).pipe(res);
    }
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
