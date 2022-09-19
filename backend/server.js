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
    const options = {};

    let start;
    let end;

    const range = req.headers.range;
    if (range) {
      const bytesPrefix = "bytes=";
      if (range.startsWith(bytesPrefix)) {
        const bytesRange = range.substring(bytesPrefix.length);
        const parts = bytesRange.split("-");
        if (parts.length === 2) {
          const rangeStart = parts[0] && parts[0].trim();
          if (rangeStart && rangeStart.length > 0) {
            options.start = start = parseInt(rangeStart);
          }
          const rangeEnd = parts[1] && parts[1].trim();
          if (rangeEnd && rangeEnd.length > 0) {
            options.end = end = parseInt(rangeEnd);
          }
        }
      }
    }

    res.setHeader("content-type", "audio/mp3");

    fs.stat(videoPath, (err, stat) => {
      if (err) {
        console.error(`File stat error for ${videoPath}.`);
        console.error(err);
        res.sendStatus(500);
        return;
      }

      let contentLength = stat.size;

      // Listing 4.
      if (req.method === "HEAD") {
        res.statusCode = 200;
        res.setHeader("accept-ranges", "bytes");
        res.setHeader("content-length", contentLength);
        res.end();
      } else {
        // Listing 5.
        let retrievedLength;
        if (start !== undefined && end !== undefined) {
          retrievedLength = end + 1 - start;
        } else if (start !== undefined) {
          retrievedLength = contentLength - start;
        } else if (end !== undefined) {
          retrievedLength = end + 1;
        } else {
          retrievedLength = contentLength;
        }

        // Listing 6.
        res.statusCode = start !== undefined || end !== undefined ? 206 : 200;

        res.setHeader("content-length", retrievedLength);

        if (range !== undefined) {
          res.setHeader(
            "content-range",
            `bytes ${start || 0}-${end || contentLength - 1}/${contentLength}`
          );
          res.setHeader("accept-ranges", "bytes");
        }

        // Listing 7.
        const fileStream = fs.createReadStream(videoPath, options);
        fileStream.on("error", (error) => {
          console.log(`Error reading file ${videoPath}.`);
          console.log(error);
          res.sendStatus(500);
        });

        fileStream.pipe(res);
      }
    });
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
